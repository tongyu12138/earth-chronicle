const creatureSummaries = [
  ['anomalocaris','奇虾','Anomalocaris canadensis','约5.388亿—4.854亿年前','节肢动物干群','寒武纪海洋的主动探索者，奇特却高效。'],
  ['lystrosaurus','水龙兽','Lystrosaurus murrayi','约2.989亿—2.519亿年前','二齿兽类合弓动物','在灾后世界维持稳定，是适应与恢复的代表。'],
  ['archaeopteryx','始祖鸟','Archaeopteryx lithographica','约2.014亿—1.45亿年前','鸟翼类恐龙','同时保留恐龙特征与飞羽，展示演化的连续性。'],
  ['woolly-mammoth','真猛犸象','Mammuthus primigenius','约258万—1.17万年前','长鼻目哺乳动物','群体生活并适应寒冷干草原的长距离迁徙者。'],
  ['titanoboa','泰坦巨蟒','Titanoboa cerrejonensis','约6600万—5600万年前','蛇类','古新世温暖湿地中的重量级伏击者。'],
  ['triceratops','三角龙','Triceratops horridus','约1.45亿—6600万年前','角龙类恐龙','稳定取食、重视边界，防御配置十分醒目。'],
  ['dunkleosteus','邓氏鱼','Dunkleosteus terrelli','约4.192亿—3.589亿年前','盾皮鱼','用颌部骨板形成强力切咬结构的海洋捕食者。'],
  ['arthropleura','节胸蜈蚣','Arthropleura armata','约3.589亿—2.989亿年前','多足类','煤沼森林地面上的大型装甲居民。'],
  ['quetzalcoatlus','风神翼龙','Quetzalcoatlus northropi','约1.45亿—6600万年前','翼龙','能从高处建立全局视野的巨型飞行爬行动物。'],
  ['basilosaurus','龙王鲸','Basilosaurus isis','约5600万—3390万年前','古鲸类','鲸类返海演化进入深度重构阶段的代表。'],
  ['megalodon','巨齿鲨','Otodus megalodon','约2303万—533万年前','大型鲨类','证据主要来自牙齿，体长模型仍会随研究更新。'],
  ['dickinsonia','狄更逊水母','Dickinsonia costata','约25亿—5.388亿年前','埃迪卡拉生物','外形像绗缝软垫，分类与生活方式仍在研究。']
].map((item) => ({ id:item[0], nameCn:item[1], scientificName:item[2], livedWhen:item[3], group:item[4], funIntro:item[5], mediaId:`creature-${item[0]}` }))

module.exports = { creatureSummaries }
