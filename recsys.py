def get_topk_rec(man_hist : list, idx2place_v : dict, k=None,
                 man_vector : list = None, alpha : float = 1):
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
  man_hist_vector = torch.tensor(man_hist_vector)[:, 1].mean(-1)
  if man_vector != None:
    interest_type = man_vector[0]
    man_vector = torch.tensor(man_vector[1:])
    unnul_place_vectors = torch.tensor(list(map(idx2place_v.get, places_ids)))
    places_ids = list(filter(lambda x: idx2place_v[x][0] == interest_type,  list(idx2place_v.keys())))
    temp_ids = [i for i in range(len(places_ids))]
    cosine_arr = cos((1 - alpha) * man_vector + alpha * man_hist_vector, unnul_place_vectors[1:])
  else:
    unnul_place_vectors = torch.tensor(list(map(idx2place_v.get, places_ids)))
    places_ids = list(filter(lambda x: idx2place_v[x] != [] and x not in man_hist,  list(idx2place_v.keys())))
    temp_ids = [i for i in range(len(places_ids))]
    cosine_arr = cos(man_hist_vector, unnul_place_vectors)
  if k != None:
    top_ids = torch.topk(cosine_arr, k=k).indices
  else:
    top_ids = torch.topk(cosine_arr, k=len(temp_ids)).indices
  return torch.tensor(places_ids)[top_ids].tolist()
