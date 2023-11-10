import numpy as np
from transformers import AutoTokenizer, AutoModel
import torch
import spacy
import re


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


def encode_person_text(input_string, text_tokenizer, vec_model):
    '''
    input_string - вектроное представление 
    '''
    # pattern = r'\b(?:кальян|рест|кафе|театр|кино|галлерея|памятн)\w*\b'
    # input_string = re.sub(pattern, '', input_string)
    lemm_ru = spacy.load('ru_core_news_sm')
    lemmas = lemm_ru(input_string)
    preproc_text = ' '.join([token.lemma_ for token in lemmas])
    base_types = ['Кальян', 'Ресторан', 'Кафе', 'Театр', 'Кинотеатр', 'Галерея', 'Памятник', 'кофе']
    pattern = r'\b(?:кальян|рест|кафе|театр|кино|галлерея|памятн|кофе)\w*\b'
    base_types = dict([[base_types[i], i] for i in range(len(base_types))])
    matches = re.findall(pattern, preproc_text, flags=re.IGNORECASE)
    print(preproc_text)
    print(matches)
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

text_tokenizer = AutoTokenizer.from_pretrained("ai-forever/sbert_large_nlu_ru")
vec_model = AutoModel.from_pretrained("ai-forever/sbert_large_nlu_ru")


