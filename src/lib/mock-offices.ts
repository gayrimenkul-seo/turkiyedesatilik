export interface MockOffice {
  id: string
  slug: string
  name: string
  city: string
  district: string
  address: string
  phone: string
  email: string
  licenseNo: string
  isVerified: boolean
  listingCount: number
  agentCount: number
  foundedYear: number
  description: string
  avatarColor: string
  specialties: string[]
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED'
}

export const MOCK_OFFICES: MockOffice[] = [
  {
    id: '1',
    slug: 'yalikatak-emlak-bodrum',
    name: 'Yalıkavak Premium Emlak',
    city: 'Muğla', district: 'Bodrum',
    address: 'Yalıkavak Marina Cad. No:12, Yalıkavak',
    phone: '+90 252 385 42 10',
    email: 'info@yalikavakvipmlak.com',
    licenseNo: '2019-MU-0847',
    isVerified: true, status: 'ACTIVE',
    listingCount: 34, agentCount: 6, foundedYear: 2019,
    description: 'Bodrum Yalıkavak\'ta lüks villa ve deniz manzaralı mülk satışında uzman, 5 yıllık deneyimli ekip.',
    avatarColor: '#1B4F6B',
    specialties: ['Villa', 'Lüks Konut', 'Deniz Manzaralı'],
  },
  {
    id: '2',
    slug: 'ege-residence-kusadasi',
    name: 'Ege Residence Kuşadası',
    city: 'Aydın', district: 'Kuşadası',
    address: 'Atatürk Bulv. No:48, Kuşadası Merkez',
    phone: '+90 256 614 89 23',
    email: 'info@egeresidence.com',
    licenseNo: '2017-AY-1124',
    isVerified: true, status: 'ACTIVE',
    listingCount: 52, agentCount: 9, foundedYear: 2017,
    description: 'Kuşadası\'nın en köklü emlak ofisi. Satılık daire, villa ve arsa konularında bölgenin lideri.',
    avatarColor: '#C4552A',
    specialties: ['Daire', 'Arsa', 'Tatil Konutu'],
  },
  {
    id: '3',
    slug: 'alacati-homes-cesme',
    name: 'Alaçatı Homes Çeşme',
    city: 'İzmir', district: 'Çeşme',
    address: 'Çarşı Sk. No:7, Alaçatı, Çeşme',
    phone: '+90 232 716 54 30',
    email: 'info@alacatihomes.com',
    licenseNo: '2021-IZ-0392',
    isVerified: true, status: 'ACTIVE',
    listingCount: 28, agentCount: 5, foundedYear: 2021,
    description: 'Alaçatı\'nın taş ev mimarisini ve Çeşme\'nin deniz yaşamını en iyi yansıtan butik emlak ofisi.',
    avatarColor: '#2A6F5E',
    specialties: ['Taş Ev', 'Butik Konut', 'Kiralık'],
  },
  {
    id: '4',
    slug: 'blue-lagoon-fethiye',
    name: 'Blue Lagoon Fethiye Emlak',
    city: 'Muğla', district: 'Fethiye',
    address: 'Fethi Bey Cad. No:33, Fethiye Merkez',
    phone: '+90 252 612 77 45',
    email: 'info@bluelagoonfethiye.com',
    licenseNo: '2018-MU-0561',
    isVerified: true, status: 'ACTIVE',
    listingCount: 41, agentCount: 7, foundedYear: 2018,
    description: 'Fethiye ve Ölüdeniz bölgesinde havuzlu villa, bağımsız ev ve proje konutlarında uzman.',
    avatarColor: '#1B5E7A',
    specialties: ['Villa', 'Ölüdeniz', 'Proje'],
  },
  {
    id: '5',
    slug: 'marina-properties-bodrum',
    name: 'Marina Properties Bodrum',
    city: 'Muğla', district: 'Bodrum',
    address: 'Neyzen Tevfik Cad. No:92, Bodrum Merkez',
    phone: '+90 252 316 10 58',
    email: 'info@marinaproperties.com.tr',
    licenseNo: '2015-MU-0214',
    isVerified: true, status: 'ACTIVE',
    listingCount: 67, agentCount: 12, foundedYear: 2015,
    description: 'Bodrum\'un en köklü ve güvenilir emlak markası. Müskebi\'den Türkbükü\'ne tüm bölgelerde hizmet.',
    avatarColor: '#8B3A1A',
    specialties: ['Marina', 'Penthouse', 'Yatırım'],
  },
  {
    id: '6',
    slug: 'kordon-emlak-izmir',
    name: 'Kordon Emlak & Gayrimenkul',
    city: 'İzmir', district: 'Konak',
    address: 'Kordon Boyu No:15, Alsancak, Konak',
    phone: '+90 232 464 33 20',
    email: 'info@kordonemlak.com',
    licenseNo: '2016-IZ-0887',
    isVerified: true, status: 'ACTIVE',
    listingCount: 39, agentCount: 8, foundedYear: 2016,
    description: 'İzmir Kordon ve çevresinde lüks daire, ofis ve ticari gayrimenkul alanında uzmanlaşmış ofis.',
    avatarColor: '#4A3A1A',
    specialties: ['Daire', 'Ticari', 'Ofis'],
  },
  {
    id: '7',
    slug: 'blue-bay-realty-marmaris',
    name: 'Blue Bay Realty Marmaris',
    city: 'Muğla', district: 'Marmaris',
    address: 'Hacı Mustafa Sokak No:5, Marmaris',
    phone: '+90 252 413 62 77',
    email: 'info@bluebayrealty.com.tr',
    licenseNo: '2020-MU-1033',
    isVerified: true, status: 'ACTIVE',
    listingCount: 23, agentCount: 4, foundedYear: 2020,
    description: 'Marmaris ve İçmeler\'de marine manzaralı villa, kiralık mülk ve tatil konutlarında uzman ekip.',
    avatarColor: '#1A3A5C',
    specialties: ['Villa', 'Kiralık', 'Marine Manzarası'],
  },
  {
    id: '8',
    slug: 'akdeniz-emlak-antalya',
    name: 'Akdeniz Emlak Antalya',
    city: 'Antalya', district: 'Muratpaşa',
    address: 'Lara Cad. No:210, Lara, Muratpaşa',
    phone: '+90 242 315 48 90',
    email: 'info@akdenizemlak.com',
    licenseNo: '2014-AN-0173',
    isVerified: true, status: 'ACTIVE',
    listingCount: 58, agentCount: 10, foundedYear: 2014,
    description: 'Antalya\'nın en deneyimli ekibiyle Lara, Konyaaltı ve merkez bölgelerinde kapsamlı emlak hizmeti.',
    avatarColor: '#2A6F5E',
    specialties: ['Daire', 'Lara', 'Yatırım'],
  },
]
