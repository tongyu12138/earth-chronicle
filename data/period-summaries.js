const periodSummaries = [
  ['hadean','冥古宙','Hadean','约45.4亿—40亿年前','precambrian','#e97b43','◉','一颗由碰撞、岩浆与冷却共同塑造的年轻行星。','尚无已确认生命',3],
  ['archean','太古宙','Archean','约40亿—25亿年前','precambrian','#2d8c88','≈','海洋、古老大陆核与最早生命证据共同出现。','叠层石形成者',3],
  ['proterozoic','元古宙','Proterozoic','约25亿—5.388亿年前','precambrian','#4f91b8','✧','氧气、真核细胞、全球冰期与大型多细胞生命登场。','格里帕尼亚',4],
  ['cambrian','寒武纪','Cambrian','约5.388亿—4.854亿年前','paleozoic','#28a4a2','✺','海洋生态系统的身体结构与捕食关系快速扩展。','奇虾',1],
  ['ordovician','奥陶纪','Ordovician','约4.854亿—4.438亿年前','paleozoic','#378fa8','≋','海洋生物大辐射，最早陆生植物留下微小痕迹。','艾吉罗卡西斯',1],
  ['silurian','志留纪','Silurian','约4.438亿—4.192亿年前','paleozoic','#3b9b78','♒','海洋生态恢复，有颌鱼和陆地生态先驱扩展。','海蝎',0],
  ['devonian','泥盆纪','Devonian','约4.192亿—3.589亿年前','paleozoic','#5a8f65','◇','鱼类多样化，森林成长，脊椎动物探索陆地。','邓氏鱼',1],
  ['carboniferous','石炭纪','Carboniferous','约3.589亿—2.989亿年前','paleozoic','#477c59','♧','煤沼森林、较高氧气与羊膜动物的新机会。','节胸蜈蚣',2],
  ['permian','二叠纪','Permian','约2.989亿—2.519亿年前','paleozoic','#9a6b46','△','盘古大陆趋于干旱，末期迎来最大生物危机。','基龙',1],
  ['triassic','三叠纪','Triassic','约2.519亿—2.014亿年前','mesozoic','#b36c45','▲','大灭绝后的恢复世界，恐龙与哺乳动物支系出现。','腔骨龙',2],
  ['jurassic','侏罗纪','Jurassic','约2.014亿—1.45亿年前','mesozoic','#9a9345','✦','大型蜥脚类繁盛，鸟类支系在恐龙中出现。','剑龙',1],
  ['cretaceous','白垩纪','Cretaceous','约1.45亿—6600万年前','mesozoic','#648b4e','✸','开花植物扩张，恐龙高度多样，撞击重置世界。','霸王龙',1],
  ['paleocene','古新世','Paleocene','约6600万—5600万年前','cenozoic','#799560','❖','撞击后的恢复期，哺乳动物与鸟类进入新空间。','泰坦巨蟒',1],
  ['eocene','始新世','Eocene','约5600万—3390万年前','cenozoic','#6b9b78','≈','温暖世界中的哺乳动物辐射，鲸类重返海洋。','龙王鲸',2],
  ['oligocene','渐新世','Oligocene','约3390万—2303万年前','cenozoic','#ad8a5c','▰','南极冰盖形成，开放环境与巨型哺乳动物出现。','副巨犀',0],
  ['miocene','中新世','Miocene','约2303万—533万年前','cenozoic','#b17a4c','⌁','草原扩展、海洋巨兽活跃，人族支系出现。','巨齿鲨',1],
  ['pliocene','上新世','Pliocene','约533万—258万年前','cenozoic','#b98d5f','⋰','全球继续冷却，现代生态轮廓加强。','袋剑虎',3],
  ['pleistocene','更新世','Pleistocene','约258万—1.17万年前','cenozoic','#7297b1','❄','冰期循环、巨型动物与多支人类共同生活。','真猛犸象',4],
  ['holocene','全新世','Holocene','约1.17万年前—至今','cenozoic','#6fa3a0','◎','农业、城市与全球文明在间冰期扩展。','真猛犸象',30],
  ['early-homo','早期人属','Early Homo','约280万—30万年前','human-history','#a87958','⌁','多个人属物种并存，工具、迁徙与用火发展。','阿法南方古猿',5],
  ['hunter-gatherer','狩猎采集与象征文化','Foragers & Symbolic Culture','约30万—1.2万年前','human-history','#9d6d55','✣','智人扩散，复杂工具、艺术与社会网络增加。','人类社会与技术',2],
  ['agricultural-revolution','农业革命','Agricultural Transitions','约1.2万年前起','human-history','#9c824d','✤','多个地区独立驯化动植物，定居人口增加。','人类社会与技术',1],
  ['first-civilizations','早期城市与文明','First Cities & States','约公元前4000—前800年','human-history','#a46e4e','▦','城市、文字、工程与国家组织在多地发展。','人类社会与技术',2],
  ['classical-civilizations','古典文明','Classical Civilizations','约公元前800—公元500年','human-history','#b07c58','⌂','大型帝国、哲学与跨区域贸易并行发展。','人类社会与技术',1],
  ['medieval-societies','中世纪社会','Medieval Societies','约公元500—1450年','human-history','#786f63','✥','跨大陆交流、城市复兴与知识机构持续变化。','人类社会与技术',0],
  ['early-modern','早期现代与全球交流','Early Modern & Global Exchange','约1450—1750年','human-history','#9f6248','✺','印刷、远洋航行与科学方法重组世界联系。','人类社会与技术',2],
  ['industrial-revolution','工业革命','Industrial Revolution','约1750—1914年','human-history','#806b5d','⚙','化石能源、机械、城市与现代科学共同加速。','人类社会与技术',5],
  ['modern-world','现代世界','Modern World','约1914—1947年','human-history','#65717c','✈','全球战争、现代物理、航空与医学重塑世界。','人类社会与技术',3],
  ['digital-ai','数字与人工智能时代','Digital & AI Age','1947年—至今','human-history','#6475d9','⌘','芯片、网络与人工智能进入大众工具。','人类社会与技术',15]
].map((item) => ({
  id:item[0], name:item[1], englishName:item[2], range:item[3], eraId:item[4], color:item[5], icon:item[6],
  tagline:item[7], representativeName:item[8], eventCount:item[9], mediaId:`period-${item[0]}`
}))

module.exports = { periodSummaries }
