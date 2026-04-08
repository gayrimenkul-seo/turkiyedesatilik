import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seed başlıyor…')

  // ─── Ofisler ────────────────────────────────────────────────────────
  const [officeBodyrum, officeKusadasi] = await Promise.all([
    prisma.office.upsert({
      where:  { slug: 'yalikatak-emlak-bodrum' },
      update: {},
      create: {
        slug:       'yalikatak-emlak-bodrum',
        name:       'Yalıkavak Premium Emlak',
        phone:      '+90 252 385 42 10',
        email:      'info@yalikavakvipmlak.com',
        address:    'Yalıkavak Marina Cad. No:12, Yalıkavak',
        city:       'Muğla',
        district:   'Bodrum',
        licenseNo:  '2019-MU-0847',
        isVerified: true,
        status:     'ACTIVE',
        lat:        37.1024,
        lng:        27.2785,
      },
    }),
    prisma.office.upsert({
      where:  { slug: 'high5-emlak-kusadasi' },
      update: {},
      create: {
        slug:       'high5-emlak-kusadasi',
        name:       'HIGH5 EMLAK',
        phone:      '+90 256 614 32 10',
        email:      'info@high5emlak.com',
        address:    'Atatürk Bulv. No:48, Merkez',
        city:       'Aydın',
        district:   'Kuşadası',
        licenseNo:  '2024-TDS-001',
        isVerified: true,
        status:     'ACTIVE',
        lat:        37.8578,
        lng:        27.2592,
      },
    }),
  ])

  console.log(`  ✓ ${officeBodyrum.name}`)
  console.log(`  ✓ ${officeKusadasi.name}`)

  // ─── Kullanıcılar (agent user'ları) ─────────────────────────────────
  const [userAli, userMurat] = await Promise.all([
    prisma.user.upsert({
      where:  { email: 'ali@yalikavakvipmlak.com' },
      update: {},
      create: {
        name:           'Ali Koçak',
        email:          'ali@yalikavakvipmlak.com',
        phone:          '+90 532 310 44 55',
        role:           'AGENT',
        preferredLocale: 'tr',
      },
    }),
    prisma.user.upsert({
      where:  { email: 'murat@high5emlak.com' },
      update: {},
      create: {
        name:           'Murat Demir',
        email:          'murat@high5emlak.com',
        phone:          '+90 532 441 87 23',
        role:           'AGENT',
        preferredLocale: 'tr',
      },
    }),
  ])

  // ─── Agent'lar ───────────────────────────────────────────────────────
  const [agentAli, agentMurat] = await Promise.all([
    prisma.agent.upsert({
      where:  { userId: userAli.id },
      update: {},
      create: {
        name:     userAli.name ?? '',
        phone:    userAli.phone!,
        email:    userAli.email,
        userId:   userAli.id,
        officeId: officeBodyrum.id,
      },
    }),
    prisma.agent.upsert({
      where:  { userId: userMurat.id },
      update: {},
      create: {
        name:     userMurat.name ?? '',
        phone:    userMurat.phone!,
        email:    userMurat.email,
        userId:   userMurat.id,
        officeId: officeKusadasi.id,
      },
    }),
  ])

  console.log(`  ✓ Agent: ${agentAli.name}`)
  console.log(`  ✓ Agent: ${agentMurat.name}`)

  // ─── İlanlar ────────────────────────────────────────────────────────
  const listings = [
    {
      slug:         'bodrum-satilik-deniz-manzarali-villa',
      title:        'Deniz Manzaralı Lüks Villa',
      description:  "Bodrum Yalıkavak'ın en prestijli konumlarından birinde, eşsiz deniz manzarasına sahip özel villa. 420 m², özel havuz, 5+2 plan, Yalıkavak marinasına 800 metre.",
      listingType:  'SALE' as const,
      propertyType: 'VILLA' as const,
      status:       'ACTIVE' as const,
      price:        85_000_000,
      currency:     'TRY' as const,
      pricePerSqm:  202_381,
      city:         'Muğla',
      district:     'Bodrum',
      neighborhood: 'Yalıkavak',
      sqm:          420,
      rooms:        '5+2',
      bathrooms:    4,
      floors:       2,
      buildingFloor: 0,
      age:          3,
      viewType:     'SEA' as const,
      hasPool:      true,
      hasGarage:    true,
      hasGarden:    true,
      isFurnished:  true,
      isRadar:      true,
      lat:          37.1024,
      lng:          27.2785,
      agentId:      agentAli.id,
      officeId:     officeBodyrum.id,
    },
    {
      slug:         'kusadasi-satilik-sehir-manzarali-31-daire',
      title:        'Şehir Manzaralı 3+1 Daire',
      description:  "Kuşadası Kadınlar Denizi bölgesinde, şehir ve deniz manzaralı 3+1 daire. 2020 yapımı güvenlikli site, havuz, spor salonu, kapalı otopark.",
      listingType:  'SALE' as const,
      propertyType: 'APARTMENT' as const,
      status:       'ACTIVE' as const,
      price:        32_000_000,
      currency:     'TRY' as const,
      pricePerSqm:  220_690,
      city:         'Aydın',
      district:     'Kuşadası',
      neighborhood: 'Kadınlar Denizi',
      sqm:          145,
      rooms:        '3+1',
      bathrooms:    2,
      floors:       8,
      buildingFloor: 5,
      age:          6,
      viewType:     'SEA' as const,
      hasPool:      true,
      hasGarage:    true,
      hasGarden:    false,
      isFurnished:  false,
      isRadar:      false,
      lat:          37.8578,
      lng:          27.2592,
      agentId:      agentMurat.id,
      officeId:     officeKusadasi.id,
    },
    {
      slug:         'cesme-kiralik-denize-sifir-21-daire',
      title:        'Denize Sıfır 2+1 Kiralık Daire',
      description:  "Çeşme Alaçatı'nın kalbinde, denize sıfır konumda 2+1 kiralık daire. Taş ev mimarisi, otantik Ege atmosferi. Alaçatı çarşısına yürüme mesafesinde.",
      listingType:  'RENT' as const,
      propertyType: 'APARTMENT' as const,
      status:       'ACTIVE' as const,
      price:        75_000,
      currency:     'TRY' as const,
      city:         'İzmir',
      district:     'Çeşme',
      neighborhood: 'Alaçatı',
      sqm:          95,
      rooms:        '2+1',
      bathrooms:    1,
      floors:       2,
      buildingFloor: 1,
      age:          15,
      viewType:     'SEA' as const,
      hasPool:      false,
      hasGarage:    false,
      hasGarden:    false,
      isFurnished:  true,
      isRadar:      false,
      lat:          38.2773,
      lng:          26.3785,
      agentId:      agentMurat.id,
      officeId:     officeKusadasi.id,
    },
    {
      slug:         'fethiye-satilik-havuzlu-villa',
      title:        'Havuzlu Deniz Manzaralı Villa',
      description:  "Fethiye Ölüdeniz'in eşsiz mavi lagününe tepeden bakan villa. 580 m², 6+2, özel havuz, panoramik deniz manzarası.",
      listingType:  'SALE' as const,
      propertyType: 'VILLA' as const,
      status:       'ACTIVE' as const,
      price:        120_000_000,
      currency:     'TRY' as const,
      pricePerSqm:  206_897,
      city:         'Muğla',
      district:     'Fethiye',
      neighborhood: 'Ölüdeniz',
      sqm:          580,
      rooms:        '6+2',
      bathrooms:    5,
      floors:       2,
      buildingFloor: 0,
      age:          7,
      viewType:     'SEA' as const,
      hasPool:      true,
      hasGarage:    true,
      hasGarden:    true,
      isFurnished:  true,
      isRadar:      true,
      lat:          36.5447,
      lng:          29.1142,
      agentId:      agentAli.id,
      officeId:     officeBodyrum.id,
    },
    {
      slug:         'bodrum-satilik-merkezi-21-daire',
      title:        'Merkezi Konumda 2+1 Daire',
      description:  "Bodrum merkezinde, yürüme mesafesinde tüm olanaklara ulaşabilen 2+1 daire. 2018 yapımı, yüksek kira getirisi.",
      listingType:  'SALE' as const,
      propertyType: 'APARTMENT' as const,
      status:       'ACTIVE' as const,
      price:        28_000_000,
      currency:     'TRY' as const,
      pricePerSqm:  254_545,
      city:         'Muğla',
      district:     'Bodrum',
      neighborhood: 'Merkez',
      sqm:          110,
      rooms:        '2+1',
      bathrooms:    1,
      floors:       5,
      buildingFloor: 3,
      age:          8,
      viewType:     'CITY' as const,
      hasPool:      false,
      hasGarage:    true,
      hasGarden:    false,
      isFurnished:  false,
      isRadar:      false,
      lat:          37.0344,
      lng:          27.4305,
      agentId:      agentAli.id,
      officeId:     officeBodyrum.id,
    },
    {
      slug:         'bodrum-satilik-luks-penthouse',
      title:        'Lüks Penthouse Daire',
      description:  "Bodrum Türkbükü'nün en seçkin adreslerinden birinde, özel terasıyla 200 m² lüks penthouse. Deniz ve doğa manzarası, jakuzili banyo.",
      listingType:  'SALE' as const,
      propertyType: 'APARTMENT' as const,
      status:       'ACTIVE' as const,
      price:        45_000_000,
      currency:     'TRY' as const,
      pricePerSqm:  225_000,
      city:         'Muğla',
      district:     'Bodrum',
      neighborhood: 'Türkbükü',
      sqm:          200,
      rooms:        '3+1',
      bathrooms:    2,
      floors:       6,
      buildingFloor: 6,
      age:          4,
      viewType:     'SEA' as const,
      hasPool:      true,
      hasGarage:    true,
      hasGarden:    false,
      isFurnished:  true,
      isRadar:      true,
      lat:          37.0917,
      lng:          27.4437,
      agentId:      agentAli.id,
      officeId:     officeBodyrum.id,
    },
  ]

  for (const listing of listings) {
    const created = await prisma.listing.upsert({
      where:  { slug: listing.slug },
      update: {},
      create: listing,
    })
    console.log(`  ✓ ${created.title}`)
  }

  // ─── Bölgeler ────────────────────────────────────────────────────────
  const regions = [
    {
      slug:        'bodrum',
      name:        'Bodrum',
      city:        'Muğla',
      district:    'Bodrum',
      description: "Ege'nin en prestijli kıyı kenti. Marina yaşamı, lüks villalar ve otantik Türk kültürünün buluşma noktası.",
      lat:         37.0344,
      lng:         27.4305,
      order:       1,
    },
    {
      slug:        'kusadasi',
      name:        'Kuşadası',
      city:        'Aydın',
      district:    'Kuşadası',
      description: 'Kristal berraklığındaki koylara ev sahipliği yapan, kruvaziyer turizminin merkezi Ege kenti.',
      lat:         37.8578,
      lng:         27.2592,
      order:       2,
    },
  ]

  for (const region of regions) {
    const created = await prisma.region.upsert({
      where:  { slug: region.slug },
      update: {},
      create: region,
    })
    console.log(`  ✓ Bölge: ${created.name}`)
  }

  console.log('\n✅ Seed tamamlandı.')
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
