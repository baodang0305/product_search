import time
start_time = time.time()
import sys;
import spacy;
nlp = spacy.load("ja_core_news_lg")

print("Spacy load: %s" % (time.time() - start_time))
# nlp = spacy.load("en_core_web_lg")


import pytextrank


def extract_keyword(rawText):
  # add PyTextRank to the spaCy pipeline
  start_time_nlp = time.time()
  nlp.add_pipe("textrank")
  doc = nlp(rawText)
  print("NLP load: %s" % (time.time() - start_time_nlp))

  # examine the top-ranked phrases in the document
  print(doc._.phrases[0].text)
  # for phrase in doc._.phrases:
  #     print(phrase.text)
  #     print(phrase.rank)
  #     # print(phrase.rank, phrase.count)
  #     # print(phrase.chunks)
  
param = sys.argv[1]
extract_keyword(param)