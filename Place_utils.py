
import numpy as np
from transformers import AutoTokenizer, AutoModel
import torch
import spacy
import re

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


lemm_ru = spacy.load('ru_core_news_sm')

def create_place_emb(desc)
  emb_dict = {}
  for id in tqdm.tqdm_notebook(desc.keys()):
    text = desc[id]
    if text != '' or text != []:
      try:
        place_type, text = do_nice(text)
      except:
        print(text, id)
        break
      embedding = compute_embeddings(text, is_return=True)
      emb_dict[id] = [place_type] + embedding.cpu().tolist()
    else:
      emb_dict[id] = []
  return emb_dict