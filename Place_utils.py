
import numpy as np
from transformers import AutoTokenizer, AutoModel
import torch
import spacy
import re

def compute_prompt_embeddings(text, mode='prompt', is_return=True):
    if mode == 'prompt':
      pattern = r'\b(?:кальян|рест|кафе|театр|кино|галлерея|памятн|мест|Мест|Кальян|Рест|Кафе|театр|Кино|Галлере|Памятн|)\w*\b'
      text = re.sub(pattern, '', text)
    tensor_text = text_tokenizer(text, padding=True, truncation=True, max_length=24, return_tensors='pt')
    with torch.no_grad():
      model_out = vec_model(**tensor_text)
    embs = _mean_pooling(model_out, tensor_text['attention_mask']).squeeze()
    if mode == 'tags':
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
  for id in tqdm.tqdm_notebook(desc.keys()):
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
