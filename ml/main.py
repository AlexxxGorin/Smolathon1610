from fastapi import FastAPI
import numpy as np
from transformers import AutoTokenizer, AutoModel
import torch
import spacy
import re
import schemas
import uvicorn


def compute_prompt_embeddings(text, mode, is_return=True):
    if mode == 'prompt':
      pattern = r'\b(?:кальян|рест|кафе|театр|кино|галлерея|памятн|мест|Мест|Кальян|Рест|Кафе|театр|Кино|Галлере|Памятн|)\w*\b'
      text = re.sub(pattern, '', text)
    tensor_text = text_tokenizer(text, padding=True, truncation=True, max_length=24, return_tensors='pt')
    with torch.no_grad():
      model_out = vec_model(**tensor_text)
    embs = _mean_pooling(model_out, tensor_text['attention_mask']).squeeze()
    if mode == 'tags':
      if len(embs.shape) == 1:
        return embs
      embs = embs.mean(0)
    if is_return:
      return embs


def _mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0] #First element of model_output contains all token embeddings
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    sum_embeddings = torch.sum(token_embeddings * input_mask_expanded, 1)
    sum_mask = torch.clamp(input_mask_expanded.sum(1), min=1e-9)
    return sum_embeddings / sum_mask

def do_nice(text):
  lemm_ru = spacy.load('ru_core_news_sm')
  lemmas = lemm_ru(text)
  preproc_text = ' '.join([token.lemma_ for token in lemmas])
  base_types = ['Кальян', 'Ресторан', 'Кафе', 'Театр', 'Кинотеатр', 'Галерея', 'Памятник', 'кофе']
  pattern = pattern = r'\b(?:кальян|рест|кафе|театр|кино|галлерея|памятн|кофе)\w*\b'
  base_types = dict([[base_types[i], i] for i in range(len(base_types))])
  matches = re.findall(pattern, preproc_text, flags=re.IGNORECASE)
  if matches:
    norm_text = re.sub(pattern, '',  preproc_text)
    for i, el in enumerate(base_types):
      if len(matches[0]) < len(el):
        if matches[0].lower() in el.lower():
          idx_matches = i
          return idx_matches, norm_text
      else:
        if el.lower() in  matches[0].lower(): # !!!
          idx_matches = i
          return idx_matches, norm_text
  else:
    return 8, preproc_text


def create_place_emb(desc, mode='prompt'):
  emb_dict = {}
  for id in desc.keys():
    text = desc[id]
    if text != '' or text != []:
      if mode=='prompt':
        try:
          place_type, text = do_nice(text)
        except:
          print(text, id)
          break
        embedding = compute_prompt_embeddings(text, mode, is_return=True)
        emb_dict[id] = [place_type] + embedding.cpu().tolist()
      else:
        embedding = compute_prompt_embeddings(text, mode, is_return=True)
        emb_dict[id] = embedding.cpu().tolist()
    else:
      emb_dict[id] = []
  return emb_dict


def get_topk_rec(man_hist : list, idx2place_v : dict, k=None,
                 man_vector : list = None, alpha : float = 0.5):
  '''
  man_vector - вектор человека, если его нет рекомендуем чисто по истории, если есть учитываем промпт и историю
  man_hist - массив истроий мест человека, элементы id мест
  place_vectors - вектора мест
  k - топ k самых близких мест, если k=None просто ранжируем весь список мест
  return возвращает ранжированный список индексов мест
  alpha - коэффициент значимости истории пользователя, если 1, то не учитываем промпт человека, 0 - не учитваем историю
  '''
  cos = torch.nn.CosineSimilarity(dim=-1)
  man_hist_vector = [idx2place_v[idx] for idx in man_hist]
  man_hist_vector = torch.tensor(man_hist_vector)[:, 1:].mean(0)
  if man_vector != None:
    interest_type = man_vector[0]
    man_vector = torch.tensor(man_vector[1:])
    places_ids = list(filter(lambda x: idx2place_v[x][0] == interest_type and x not in man_hist,  list(idx2place_v.keys())))
    unnul_place_vectors = torch.tensor(list(map(idx2place_v.get, places_ids)))
    temp_ids = [i for i in range(len(places_ids))]
    temp = (1 - alpha) * man_vector + alpha * man_hist_vector
    cosine_arr = cos((1 - alpha) * man_vector + alpha * man_hist_vector, unnul_place_vectors[:, 1:])
  else:
    places_ids = list(filter(lambda x: idx2place_v[x] != [] and x not in man_hist,  list(idx2place_v.keys())))
    unnul_place_vectors = torch.tensor(list(map(idx2place_v.get, places_ids)))
    temp_ids = [i for i in range(len(places_ids))]
    cosine_arr = cos(man_hist_vector, unnul_place_vectors)
  if k != None:
    top_ids = torch.topk(cosine_arr, k=k).indices
  else:
    top_ids = torch.topk(cosine_arr, k=len(temp_ids)).indices
  return torch.tensor(places_ids)[top_ids].tolist()


def compute_embeddings(tags, is_return=False):
    pattern = r'\b(?:кальян|рест|кафе|театр|кино|галлерея|памятн|мест|Мест|Кальян|Рест|Кафе|театр|Кино|Галлере|Памятн|)\w*\b'
    tags = re.sub(pattern, '', tags)
    tensor_tags = text_tokenizer(tags, padding=True, truncation=True, max_length=24, return_tensors='pt')
    with torch.no_grad():
      model_out = vec_model(**tensor_tags)
    embs = _mean_pooling(model_out, tensor_tags['attention_mask']).squeeze()
    if is_return:
      return embs



def _mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0] #First element of model_output contains all token embeddings
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    sum_embeddings = torch.sum(token_embeddings * input_mask_expanded, 1)
    sum_mask = torch.clamp(input_mask_expanded.sum(1), min=1e-9)
    return sum_embeddings / sum_mask


def encode_person_text(input_string, text_tokenizer, vec_model, mode='prompt'):
    '''
    input_string - текстовый промпт
    '''
    # pattern = r'\b(?:кальян|рест|кафе|театр|кино|галлерея|памятн)\w*\b'
    # input_string = re.sub(pattern, '', input_string)
    if mode != 'prompt':
      tensor_prompt = text_tokenizer(input_string, padding=True, truncation=True, max_length=24, return_tensors='pt')
      with torch.no_grad():
        emb_prompt = vec_model(**tensor_prompt)
      emb_prompt = _mean_pooling(emb_prompt, tensor_prompt['attention_mask']).squeeze()
      return emb_prompt.mean(0)
    lemm_ru = spacy.load('ru_core_news_sm')
    lemmas = lemm_ru(input_string)
    preproc_text = ' '.join([token.lemma_ for token in lemmas])
    base_types = ['Кальян', 'Ресторан', 'Кафе', 'Театр', 'Кинотеатр', 'Галерея', 'Памятник', 'кофе']
    pattern = r'\b(?:кальян|рест|кафе|театр|кино|галлерея|памятн|кофе)\w*\b'
    base_types = dict([[base_types[i], i] for i in range(len(base_types))])
    matches = re.findall(pattern, preproc_text, flags=re.IGNORECASE)
    if matches:
      norm_text = re.sub(pattern, '',  preproc_text)
      tensor_prompt = text_tokenizer(input_string, padding=True, truncation=True, max_length=24, return_tensors='pt')
      with torch.no_grad():
        emb_prompt = vec_model(**tensor_prompt)
      emb_prompt = _mean_pooling(emb_prompt, tensor_prompt['attention_mask']).squeeze()
      for i, el in enumerate(base_types):
        if len(matches[0]) < len(el):
          if matches[0].lower() in el.lower():
            idx_matches = i
            return [idx_matches] + emb_prompt.tolist()
        else:
          if el.lower() in  matches[0].lower(): # !!!
            idx_matches = i
            return [idx_matches] + emb_prompt.tolist()
    else:
      return [8] + emb_prompt.tolist()


def get_mean_emb(prompt_v, tags_v):
  type_place = prompt_v[0]
  prompt_v = prompt_v[1:]
  for i in range(len(prompt_v)):
    prompt_v[i] = (prompt_v[i] + tags_v[i]) / 2
  return [prompt_v] + prompt_v



app = FastAPI()


@app.put('/get_place_vector/', response_model=schemas.PlaceVector)
def get_place_vector(place: schemas.Place):
    description_vector = create_place_emb({0: place.description}, mode="prompt")
    tags_vector = create_place_emb({0: place.tags}, mode="tags")

    place_vector = get_mean_emb(description_vector, tags_vector)
    return {"place_vector": place_vector}


@app.put('/get_user_vector/', response_model=schemas.UserVector)
def get_place_vector(user: schemas.User):
    description_vector = encode_person_text(user.description, text_tokenizer, vec_model, mode="prompt")
    tags_vector = encode_person_text(user.tags, text_tokenizer, vec_model, mode="tags")

    user_vector = get_mean_emb(description_vector, tags_vector)
    return {"user_vector": user_vector}


if __name__ == "__main__":
    text_tokenizer = AutoTokenizer.from_pretrained("ai-forever/sbert_large_nlu_ru")
    vec_model = AutoModel.from_pretrained("ai-forever/sbert_large_nlu_ru")
    # spacy.cli.download('ru_code_news_sm')
    lemm_ru = spacy.load('ru_core_news_sm')

    uvicorn.run(app, host="0.0.0.0", port=8000)
