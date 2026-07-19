const sources = [
  {
    id: 'meth-nature-2006',
    title: 'Evidence for methanogenic Archaea before 3.46 billion years ago',
    organization: 'Nature', year: '2006', type: '原始研究', doi: '10.1038/nature04584',
    url: 'https://www.nature.com/articles/nature04584'
  },
  {
    id: 'meth-epsl-2019',
    title: 'The methane cycle in the Precambrian atmosphere',
    organization: 'Earth and Planetary Science Letters', year: '2019', type: '研究综述', doi: '10.1016/j.epsl.2019.06.022',
    url: 'https://www.sciencedirect.com/science/article/pii/S0012821X19303619'
  },
  {
    id: 'meth-science-2001',
    title: 'Archaean molecular fossils and the early rise of eukaryotes',
    organization: 'Science / PubMed', year: '2001', type: '原始研究', doi: '10.1126/science.1061976',
    url: 'https://pubmed.ncbi.nlm.nih.gov/11486082/'
  },
  {
    id: 'dickinsonia-science-2018',
    title: 'Ancient steroids establish the Ediacaran fossil Dickinsonia as one of the earliest animals',
    organization: 'Science / PubMed', year: '2018', type: '原始研究', doi: '10.1126/science.aat7228',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30237355/'
  },
  {
    id: 'dickinsonia-plos-2017',
    title: 'Highly regulated growth and development of the Ediacara macrofossil Dickinsonia costata',
    organization: 'PLOS ONE / PubMed Central', year: '2017', type: '原始研究', doi: '10.1371/journal.pone.0176874',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5435172/'
  },
  {
    id: 'dickinsonia-rspb-2017',
    title: 'Quantitative study of developmental biology confirms Dickinsonia as a metazoan',
    organization: 'Proceedings B / PubMed Central', year: '2017', type: '原始研究', doi: '10.1098/rspb.2017.1348',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5597836/'
  },
  {
    id: 'anomalocaris-rom',
    title: 'Anomalocaris canadensis', organization: 'Royal Ontario Museum · Burgess Shale',
    year: '更新中', type: '博物馆物种档案', url: 'https://burgess-shale.rom.on.ca/fossils/anomalocaris-canadensis/'
  },
  {
    id: 'anomalocaris-smithsonian',
    title: 'Anomalocaris canadensis', organization: 'Smithsonian Ocean',
    year: '更新中', type: '博物馆科普', url: 'https://ocean.si.edu/through-time/ancient-seas/anomalocaris-canadensis'
  },
  {
    id: 'anomalocaris-rspb-2021',
    title: 'Three-dimensional modelling, disparity and ecology of the first Cambrian apex predators',
    organization: 'Proceedings B', year: '2021', type: '原始研究', doi: '10.1098/rspb.2021.1176',
    url: 'https://doi.org/10.1098/rspb.2021.1176'
  },
  {
    id: 'dunkleosteus-diversity-2023',
    title: 'Length estimates of Dunkleosteus terrelli using an orbital–opercular length proxy',
    organization: 'Diversity', year: '2023', type: '原始研究', doi: '10.3390/d15030318',
    url: 'https://www.mdpi.com/1424-2818/15/3/318'
  },
  {
    id: 'dunkleosteus-peerj-2023',
    title: 'Mouth dimensions and body size in Dunkleosteus terrelli',
    organization: 'PeerJ', year: '2023', type: '原始研究', doi: '10.7717/peerj.15131',
    url: 'https://peerj.com/articles/15131/'
  },
  {
    id: 'dunkleosteus-cmnh',
    title: 'Dunkleosteus terrelli in Visitor Hall', organization: 'Cleveland Museum of Natural History',
    year: '更新中', type: '博物馆馆藏说明', url: 'https://www.cmnh.org/explore/galleries-attractions/visitor-hall'
  },
  {
    id: 'lystrosaurus-peerj-2020',
    title: 'The paleobiology and paleoecology of South African Lystrosaurus',
    organization: 'PeerJ / PubMed Central', year: '2020', type: '综合研究', doi: '10.7717/peerj.10408',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7694564/'
  },
  {
    id: 'lystrosaurus-lethaia-2007',
    title: 'Lystrosaurus species composition across the Permo–Triassic boundary in the Karoo Basin',
    organization: 'Lethaia', year: '2007', type: '原始研究', doi: '10.1111/j.1502-3931.2007.00011.x',
    url: 'https://onlinelibrary.wiley.com/doi/10.1111/j.1502-3931.2007.00011.x'
  },
  {
    id: 'lystrosaurus-burrow-2017',
    title: 'Burrowing behavior and the taphonomy of Lystrosaurus',
    organization: 'Journal of Vertebrate Paleontology', year: '2017', type: '原始研究', doi: '10.1080/02724634.2017.1365080',
    url: 'https://www.tandfonline.com/doi/abs/10.1080/02724634.2017.1365080'
  },
  {
    id: 'archaeopteryx-nhm',
    title: 'Archaeopteryx', organization: 'Natural History Museum, London',
    year: '更新中', type: '博物馆物种档案', url: 'https://www.nhm.ac.uk/discover/dino-directory/archaeopteryx'
  },
  {
    id: 'archaeopteryx-flight-2018',
    title: 'Wing bone geometry reveals active flight in Archaeopteryx',
    organization: 'Nature Communications / PubMed', year: '2018', type: '原始研究', doi: '10.1038/s41467-018-03296-8',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29535376/'
  },
  {
    id: 'archaeopteryx-feathers-2014',
    title: 'The eleventh Archaeopteryx', organization: 'Nature',
    year: '2014', type: '原始研究', doi: '10.1038/nature13467', url: 'https://www.nature.com/articles/nature13467'
  },
  {
    id: 'tyrannosaurus-smithsonian',
    title: 'Tyrannosaurus rex factsheet', organization: 'Smithsonian Institution',
    year: '更新中', type: '博物馆物种档案', url: 'https://www.si.edu/newsdesk/factsheets/tyrannosaurus-rex'
  },
  {
    id: 'tyrannosaurus-growth-2004',
    title: 'Gigantism and comparative life-history parameters of tyrannosaurid dinosaurs',
    organization: 'Nature', year: '2004', type: '原始研究', doi: '10.1038/nature02699',
    url: 'https://www.nature.com/articles/nature02699'
  },
  {
    id: 'tyrannosaurus-age-2004',
    title: 'Age and growth dynamics of Tyrannosaurus rex',
    organization: 'Proceedings B / PubMed Central', year: '2004', type: '原始研究', doi: '10.1098/rspb.2004.2829',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1691809/'
  },
  {
    id: 'basilosaurus-hindlimbs-1990',
    title: 'Hind limbs of Eocene Basilosaurus: evidence of feet in whales',
    organization: 'Science / PubMed', year: '1990', type: '原始研究', doi: '10.1126/science.249.4965.154',
    url: 'https://pubmed.ncbi.nlm.nih.gov/17836967/'
  },
  {
    id: 'basilosaurus-smithsonian-ocean',
    title: 'Whales and Dolphins: evolution', organization: 'Smithsonian Ocean',
    year: '更新中', type: '博物馆科普', url: 'https://ocean.si.edu/ocean-life/marine-mammals/whales'
  },
  {
    id: 'basilosaurus-smithsonian-specimen',
    title: 'Basilosaurus cetoides (Owen, 1839)', organization: 'Smithsonian Institution Collections',
    year: '更新中', type: '馆藏记录', url: 'https://www.si.edu/object/nmnhpaleobiology_3342335'
  },
  {
    id: 'mammoth-nps-isotopes',
    title: 'Mammoth tusk isotopes reveal a lifetime of movement', organization: 'National Park Service',
    year: '更新中', type: '机构科普与研究解读', url: 'https://www.nps.gov/articles/000/mammothtuskisotopes.htm'
  },
  {
    id: 'mammoth-cell-2024',
    title: 'Chromosome-scale genome assembly from a 52,000-year-old woolly mammoth',
    organization: 'Cell / PubMed', year: '2024', type: '原始研究', doi: '10.1016/j.cell.2024.05.033',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38942016/'
  },
  {
    id: 'mammoth-science-advances-2024',
    title: 'A female woolly mammoth’s lifetime movements', organization: 'Science Advances',
    year: '2024', type: '原始研究', doi: '10.1126/sciadv.adk0818', url: 'https://doi.org/10.1126/sciadv.adk0818'
  },
  {
    id: 'afarensis-smithsonian',
    title: 'Australopithecus afarensis', organization: 'Smithsonian Human Origins Program',
    year: '更新中', type: '博物馆物种档案', url: 'https://humanorigins.si.edu/evidence/human-fossils/species/australopithecus-afarensis'
  },
  {
    id: 'afarensis-walking-model-2007',
    title: 'The energetic cost of walking in Australopithecus afarensis',
    organization: 'Journal of the Royal Society Interface / PubMed Central', year: '2007', type: '原始研究',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1618507/'
  },
  {
    id: 'afarensis-foot-2011',
    title: 'A longitudinally arched foot in Australopithecus afarensis',
    organization: 'Science', year: '2011', type: '原始研究', doi: '10.1126/science.1200448',
    url: 'https://doi.org/10.1126/science.1200448'
  },
  {
    id: 'human-origins-evidence',
    title: 'Human Evolution Evidence', organization: 'Smithsonian Human Origins Program',
    year: '更新中', type: '博物馆证据总览', url: 'https://humanorigins.si.edu/evidence'
  },
  {
    id: 'human-origins-introduction',
    title: 'Introduction to Human Evolution', organization: 'Smithsonian Human Origins Program',
    year: '更新中', type: '博物馆科普', url: 'https://humanorigins.si.edu/education/introduction-human-evolution'
  },
  {
    id: 'human-origins-stone-tools',
    title: 'Stone Tools', organization: 'Smithsonian Human Origins Program',
    year: '更新中', type: '考古证据档案', url: 'https://humanorigins.si.edu/evidence/behavior/stone-tools'
  },
  {
    id: 'human-origins-tools-food',
    title: 'Tools & Food', organization: 'Smithsonian Human Origins Program',
    year: '更新中', type: '考古证据档案', url: 'https://humanorigins.si.edu/human-characteristics/tools-food'
  },
  {
    id: 'early-life-smithsonian',
    title: 'History of Life on Earth: early life and animal origins', organization: 'Smithsonian National Museum of Natural History',
    year: '更新中', type: '博物馆教学资料', url: 'https://naturalhistory.si.edu/education/teaching-resources/life-science/early-life-earth-animal-origins'
  },
  {
    id: 'precambrian-usgs',
    title: 'The Precambrian: story of early Earth', organization: 'U.S. Geological Survey',
    year: '2007', type: '地质调查机构资料', url: 'https://pubs.usgs.gov/fs/2007/3004/pdf/FS07-3004_508.pdf'
  },
  {
    id: 'thermophiles-protein-2013',
    title: 'Protein Adaptations in Archaeal Extremophiles', organization: 'Archaea / PubMed Central',
    year: '2013', type: '研究综述', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3787623/'
  },
  {
    id: 'thermophiles-anaerobic-2014',
    title: 'Anaerobic Thermophiles', organization: 'Microorganisms / PubMed Central',
    year: '2014', type: '研究综述', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4187147/'
  },
  {
    id: 'geologic-time-nps',
    title: 'Geologic Time Scale', organization: 'National Park Service',
    year: '更新中', type: '地质机构科普', url: 'https://www.nps.gov/subjects/geology/time-scale.htm'
  },
  {
    id: 'ocean-through-time-smithsonian',
    title: 'Ocean Through Time', organization: 'Smithsonian Ocean',
    year: '更新中', type: '博物馆深时间总览', url: 'https://ocean.si.edu/through-time'
  },
  {
    id: 'fossils-australian-museum',
    title: 'Fossils', organization: 'Australian Museum',
    year: '更新中', type: '博物馆化石总览', url: 'https://australian.museum/learn/australia-over-time/fossils/'
  },
  {
    id: 'dinosaurs-nhm',
    title: 'Dino Directory', organization: 'Natural History Museum, London',
    year: '更新中', type: '博物馆恐龙档案', url: 'https://www.nhm.ac.uk/discover/dino-directory.html'
  },
  {
    id: 'dinosaurs-nps',
    title: 'Dinosaurs', organization: 'National Park Service Fossils',
    year: '更新中', type: '地质机构科普', url: 'https://www.nps.gov/subjects/fossils/dinosaurs.htm'
  }
]

const sampleIds = new Set(['methanogen', 'dickinsonia', 'anomalocaris', 'dunkleosteus', 'lystrosaurus', 'archaeopteryx', 'tyrannosaurus', 'basilosaurus', 'woolly-mammoth', 'australopithecus'])
const catalogSourceIds = {}
const { creatures } = require('../creatures')

function hostnameFromUrl(value) {
  const match = String(value || '').match(/^https?:\/\/([^/?#]+)/i)
  return match ? match[1].replace(/^www\./, '') : '科学来源'
}

function overviewSourceId(creature) {
  if (/微生物|细菌|古菌/.test(creature.group)) return 'early-life-smithsonian'
  if (['archean', 'proterozoic'].includes(creature.periodId)) return 'precambrian-usgs'
  if (/恐龙|兽脚|蜥脚|甲龙|角龙/.test(creature.group)) return 'dinosaurs-nhm'
  if (/海|水|鱼|鲸|鲨|头足/.test(`${creature.habitat}${creature.group}`)) return 'ocean-through-time-smithsonian'
  if (['pliocene', 'pleistocene', 'holocene'].includes(creature.periodId) && /猿|人/.test(`${creature.nameCn}${creature.group}`)) return 'human-origins-evidence'
  return 'fossils-australian-museum'
}

const specialCatalogSources = {
  aegirocassis: [
    {
      id: 'aegirocassis-nature-2015',
      title: 'Anomalocaridid trunk limb homology revealed by a giant filter-feeder with paired flaps',
      organization: 'Nature', year: '2015', type: '原始研究', doi: '10.1038/nature14256',
      url: 'https://www.nature.com/articles/nature14256'
    },
    {
      id: 'aegirocassis-frontiers-2023',
      title: 'Radiodont frontal appendages from the Fezouata Biota reveal adaptations to suspension-feeding',
      organization: 'Frontiers in Ecology and Evolution', year: '2023', type: '原始研究', doi: '10.3389/fevo.2023.1214109',
      url: 'https://www.frontiersin.org/journals/ecology-and-evolution/articles/10.3389/fevo.2023.1214109/full'
    }
  ],
  paraceratherium: [
    {
      id: 'paraceratherium-amnh-impact',
      title: 'Impact: The End of the Age of Dinosaurs — Paraceratherium exhibit',
      organization: 'American Museum of Natural History', year: '更新中', type: '博物馆展陈档案',
      url: 'https://www.amnh.org/exhibitions/impact'
    }
  ]
}

creatures.forEach((creature) => {
  if (sampleIds.has(creature.id)) return
  const ids = []
  const isThermophile = creature.id === 'thermophilic-microbes'
  if (isThermophile) {
    ids.push('thermophiles-protein-2013', 'thermophiles-anaerobic-2014', 'early-life-smithsonian')
  } else if (['stromatolite-builders', 'cyanobacteria'].includes(creature.id)) {
    ids.push('early-life-smithsonian', 'precambrian-usgs', 'geologic-time-nps')
  } else if (/微生物|细菌|古菌/.test(creature.group)) {
    ids.push('early-life-smithsonian', 'precambrian-usgs')
  } else {
    const encodedName = encodeURIComponent(creature.scientificName)
    const specialSources = specialCatalogSources[creature.id] || []
    if (creature.id !== 'aegirocassis') {
      const taxonId = `pbdb-taxon-${creature.id}`
      sources.push({
        id: taxonId, title: `${creature.scientificName} taxonomy record`, organization: 'Paleobiology Database',
        year: '动态记录', type: '科学数据库', url: `https://paleobiodb.org/data1.2/taxa/single.json?name=${encodedName}&show=full`
      })
      ids.push(taxonId)
    }
    if (creature.quizEligible && !['aegirocassis', 'paraceratherium'].includes(creature.id)) {
      const occurrencesId = `pbdb-occurrences-${creature.id}`
      sources.push({
        id: occurrencesId, title: `${creature.scientificName} fossil occurrences`, organization: 'Paleobiology Database',
        year: '动态记录', type: '科学数据库', url: `https://paleobiodb.org/data1.2/occs/list.json?base_name=${encodedName}&limit=20&show=coords,strat`
      })
      ids.push(occurrencesId)
    }
    specialSources.forEach((source) => { sources.push(source); ids.push(source.id) })
    ids.push(overviewSourceId(creature))
  }
  ;(creature.sourceUrls || []).forEach((url, index) => {
    const sourceId = `published-${creature.id}-${index + 1}`
    sources.push({ id: sourceId, title: `${creature.nameCn}相关研究或馆藏记录 ${index + 1}`, organization: hostnameFromUrl(url), year: '已收录', type: '研究或机构来源', url })
    ids.unshift(sourceId)
  })
  catalogSourceIds[creature.id] = Array.from(new Set(ids))
})

const sourceMap = sources.reduce((map, source) => {
  map[source.id] = source
  return map
}, {})

function getSources(sourceIds) {
  return (sourceIds || []).map((id) => sourceMap[id]).filter(Boolean)
}

module.exports = { sources, sourceMap, catalogSourceIds, getSources }
