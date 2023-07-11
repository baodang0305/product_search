import spacy;
# nlp = spacy.load("ja_core_news_lg")
nlp = spacy.load("en_core_web_sm")
import pytextrank

def extract_keyword(rawText):

  # text = """
  # freepik.com
  # Premium Photo | Boy reading book with him buffalo, thailand
  # pinterest.com
  # Ghim trên Vẻ đẹp Việt (Vietnamese Beauty)
  # 123rf.com
  # Boy Reading Book With Him Buffalo, Thailand Stock Photo, Picture And Royalty Free Image. Image 34891835.
  # tripadvisor.com
  # Buffalo rider - Picture of Yola Trekking, Kalaw - Tripadvisor
  # freepik.com
  # Premium Photo | A boys riding buffaloes and reading a book for education.
  # wikimedia.org
  # File:Philippine water buffalo (carabao).JPG - Wikimedia Commons
  # dreamstime.com
  # Smiles on Mountain editorial photography. Image of editorial - 39631422
  # vietnamdiscovery.com
  # Riding a Water Buffalo in Hoi An - Unique Activity for Village Experience
  # alamy.com
  # Burmese farmer riding buffalo in Shan state Myanmar Stock Photo - Alamy
  # alamy.com
  # Shan girl walking with a water buffalo on a track near Kalaw, Shan State, Myanmar Stock Photo - Alamy
  # istockphoto.com
  # Asian Woman In Tribe Dress With Water Buffalo In Farmfriendship Concept Stock Photo - Download Image Now - iStock
  # freepik.com
  # Premium Photo | A boys riding buffaloes and reading a book for education.
  # heritage-line.com
  # Top Movies Set in Vietnam (But Not About the Vietnam War)
  # crushpixel.com
  # Couple farmer in farmer suit with buffalo, Thailand countryside - stock photo 3389331 | Crushpixel
  # shutterstock.com
  # Children Riding Water Buffalo Stock Photo 449651077 | Shutterstock
  # istockphoto.com
  # Young Herder Stock Photo - Download Image Now - Boys, Domestic Water Buffalo, Child - iStock
  # alamy.com
  # Farmer riding a buffalo on the field at countryside. this lifestyle Thai people in Countryside Thailand Stock Photo - Alamy
  # 123rf.com
  # The Joy Of Children Farmers Thailand Sleeping On His Back In Buffalo Stock Photo, Picture And Royalty Free Image. Image 43157628.
  # evaneos.co.uk
  # Visit Heho in a tailor-made tour | Evaneos
  # freepik.com
  # Premium Photo | Farmer riding a water buffalo in rural vietnam
  # facebook.com
  # Wycliffe Bible Translators UK and Ireland - Today we are praying for the Bunong, a people group in Cambodia. who are halfway through translating the Bible. Pray that staff working with the translation team will see the power and truth of God’s word impacting their everyday lives. 📸: A Cambodian boy rides on the back of a water buffalo in the town of Phnom Penh, Cambodia, photo from IMB | Facebook
  # pinterest.com
  # le buffle est un animal domestique pour labourer les rizières , ou tirer les charrettes . | Beautiful vietnam, Water buffalo, World cultures
  # pinterest.com
  # Pinterest
  # pinterest.nz
  # Water Buffalo mainly with Children.
  # alamy.com
  # Farmer riding a buffalo on the field at countryside. this lifestyle Thai people in Countryside Thailand Stock Photo - Alamy
  # facebook.com
  # Karenni Poe Reh Comedian
  # pinterest.com
  # Pinterest
  # alamy.com
  # Burmese farmer riding buffalo in Shan state Myanmar Stock Photo - Alamy
  # 500px.com
  # Simply Sellable: Tips for Making Your Travel Photos Bankable - 500px
  # investvine.com
  # 37% jobless in Myanmar, study finds - Investvine
  # wikipedia.org
  # Tập tin:Walking the water buffalo.jpg – Wikipedia tiếng Việt
  # taimienphi.vn
  # Hình nền con trâu cho máy tính đẹp nhất, chất lượng full HD
  # wallpaperflare.com
  # HD wallpaper: mood, boy, rider, Thailand, Buffalo | Wallpaper Flare
  # vietnamplus.vn
  # Buffalo in Vietnamese culture | Videos | Vietnam (VietnamPlus)
  # alamy.com
  # Couple Thai farmers family happiness time riding on buffalo on the field, Thailand Stock Photo - Alamy
  # vnanet.vn
  # Young Photographers’ Festival 2017
  # pexels.com
  # Cậu Bé Cưỡi Trâu Nước · Ảnh có sẵn miễn phí
  # canstockphoto.com
  # Thai farmer with buffalo. | CanStock
  # thailandtreks.com
  # Bicycle Tours - Thailand Treks
  # shutterstock.com
  # Child Riding Buffalo Stock Photo 289746104 | Shutterstock
  # aluxurytravelblog.com
  # Myanmar jade market - A Luxury Travel Blog : A Luxury Travel Blog
  # 123rf.com
  # Boy And Water Buffalo At The Paddy Fields Stock Photo, Picture And Royalty Free Image. Image 33690711.
  # avnerofer.com
  # photograph art print of cute boy posing on water buffalo
  # fineartamerica.com
  # Vietnamese Girl Water Buffalo Poster by Chuck Kuhn - Fine Art America
  # tripadvisor.com
  # Water buffalo riding in the fields of Hoi An! - Picture of Hoi An Eco Green Tour - Tripadvisor
  # alamy.com
  # Boy riding water buffalo in countryside near Lao Cai in northern Vietnam Stock Photo - Alamy
  # thailanguagehut.com
  # Thai Language Lessons and Examples - speak like a local
  # woah.org
  # One Health Joint Plan of Action launched to address threats - WOAH
  # freepik.com
  # Premium Photo | Asian farmer sitting on a buffalo in the field
  # tripadvisor.com
  # Poor children's photos without school at rice farmers in Cambodia. - Picture of Angkor Guide Tour, Siem Reap - Tripadvisor
  # quora.com
  # What rides on the back of a buffalo? - Quora
  # gettyimages.fi
  # 680 Buffalo Boy Stock Photos, High-Res Pictures, and Images - Getty Images
  # freepik.com
  # Premium Photo | Thai farmer children playing together while riding a buffalo.
  # flickr.com
  # Girl and Water Buffalo, Vietnam | A vietnames girl riding a … | Flickr
  # shutterstock.com
  # Rural Boy Riding Buffalo Reading Book Stock Photo 1126014785 | Shutterstock
  # sharerice.com
  # File:Pleng Ruk Baan Nah2.jpg - ShareRice Wiki (AFN)
  # worwatthana.com
  # We're getting through this as a family (Pt. 2) — Wor. Watthana Muay Thai Gym ค่ายมวย ว. วัฒนะ
  # shutterstock.com
  # Couple Farmer Farmer Suit Buffalo Thailand Stock Photo 483184099 | Shutterstock
  # istockphoto.com
  # Thai Farmer With Buffalo Stock Photo - Download Image Now - Domestic Water Buffalo, Farmer, Holding - iStock
  # agefotostock.com
  # small boy sitting on a water buffalo, Burma, Stock Photo, Picture And Rights Managed Image. Pic. BWI-BLWS197875 | agefotostock
  # """

  # add PyTextRank to the spaCy pipeline
  nlp.add_pipe("textrank")
  doc = nlp(rawText)

  # examine the top-ranked phrases in the document
  print(doc._.phrases[0].text)
  # for phrase in doc._.phrases:
  #     print(phrase.text)
  #     print(phrase.rank)
  #     # print(phrase.rank, phrase.count)
  #     # print(phrase.chunks)
  
import sys

param = sys.argv[1]
extract_keyword(param)