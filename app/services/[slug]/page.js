'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, MessageCircle, Calendar, Clock, CheckCircle2, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

const servicesData = {
  'wedding-puja': {
    title: 'Wedding Puja (Vivah Sanskar)',
    slug: 'wedding-puja',
    icon: '💑',
    heroImage: 'https://images.pexels.com/photos/36053876/pexels-photo-36053876.jpeg',
    gallery: [
      'https://images.pexels.com/photos/35204633/pexels-photo-35204633.jpeg',
      'https://images.pexels.com/photos/8751531/pexels-photo-8751531.jpeg',
      'https://images.pexels.com/photos/31104752/pexels-photo-31104752.jpeg'
    ],
    significance: {
      title: 'Meaning and Significance',
      content: 'Vivah Sanskar is one of the most sacred of the 16 sanskars in Hindu tradition. It is not merely a social contract but a spiritual union of two souls ordained by the divine. The wedding ceremony is performed before Agni (sacred fire) as witness, with the belief that the bond created transcends this lifetime. The rituals symbolize the couple\'s commitment to support each other in dharma (righteousness), artha (prosperity), kama (desires), and moksha (liberation). The seven vows (Saptapadi) taken around the sacred fire represent promises for seven aspects of married life - nourishment, strength, prosperity, happiness, progeny, long life, and devotion.',
      keyPoints: [
        'Sacred union of two souls blessed by divine presence',
        'One of the 16 essential sanskars in Hindu dharma',
        'Creates spiritual bond that transcends lifetimes',
        'Performed before Agni (sacred fire) as the eternal witness',
        'Establishes foundation for dharmic family life'
      ]
    },
    benefits: {
      title: 'Spiritual and Practical Benefits',
      spiritual: [
        'Divine blessings for lifelong companionship and harmony',
        'Spiritual protection and guidance from deities for the couple',
        'Karmic bonds are sanctified and purified through Vedic rituals',
        'Creates positive energy field around the couple and families',
        'Invokes blessings from ancestors and divine forces'
      ],
      practical: [
        'Establishes strong foundation for married life',
        'Brings families together in harmony and unity',
        'Creates auspicious beginning for new chapter of life',
        'Traditional ceremonies provide cultural continuity',
        'Muhurat selection ensures favorable planetary influences'
      ]
    },
    auspiciousTime: {
      title: 'Ideal Time to Perform',
      content: 'Wedding ceremonies should be performed during auspicious muhurats determined by Vedic astrology. The most favorable months are Kartik, Margashirsha, Phalguna, and Vaishakha. Certain nakshatras like Rohini, Uttara Phalguni, Uttara Ashadha, and Uttara Bhadrapada are considered highly auspicious. Avoid inauspicious periods like Kharmas (mid-December to mid-January), Adhik Maas (extra lunar month), and eclipse periods.',
      periods: [
        'Auspicious Months: Kartik (Oct-Nov), Margashirsha (Nov-Dec), Phalguna (Feb-Mar), Vaishakha (Apr-May)',
        'Favorable Nakshatras: Rohini, Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada, Magha',
        'Preferred Days: Sunday, Monday, Wednesday, Thursday, Friday',
        'Best Time: Morning or evening as per kundali matching',
        'Avoid: Kharmas, Adhik Maas, Malmas, eclipse periods, and inauspicious tithis'
      ]
    },
    procedure: {
      title: 'Key Rituals and Procedure',
      steps: [
        {
          name: 'Ganesh Puja',
          description: 'Invocation of Lord Ganesh to remove obstacles and ensure smooth ceremony'
        },
        {
          name: 'Kalash Sthapana',
          description: 'Installation of sacred kalash representing cosmic energies and deities'
        },
        {
          name: 'Kanyadaan',
          description: 'Father gives away daughter as the most precious gift with sacred mantras'
        },
        {
          name: 'Vivah Homa',
          description: 'Sacred fire ceremony with offerings and Vedic mantras'
        },
        {
          name: 'Saptapadi',
          description: 'Seven sacred steps around fire, taking seven vows for married life'
        },
        {
          name: 'Sindoor Daan',
          description: 'Groom applies sindoor on bride\'s forehead symbolizing married status'
        },
        {
          name: 'Mangalsutra Dharanam',
          description: 'Tying of sacred thread with auspicious mantras'
        },
        {
          name: 'Ashirvad',
          description: 'Blessings from elders, family members, and priests'
        }
      ],
      duration: '3-4 hours (varies based on customs and muhurat)'
    },
    additionalInfo: {
      title: 'Important Information',
      points: [
        'Kundali matching (Guna Milan) should be done before fixing the wedding date',
        'Muhurat consultation with experienced astrologer is essential',
        'All puja samagri (materials) can be arranged by Pandit Ji',
        'Traditional Vedic mantras will be recited in Sanskrit with Hindi explanations',
        'Photography and videography can be coordinated during the ceremony',
        'Pre-wedding ceremonies like Haldi, Mehendi, and Sangeet can also be arranged',
        'Both North Indian and South Indian wedding rituals can be performed',
        'Customization available based on family traditions and preferences'
      ]
    },
    samagriIncluded: [
      'Sacred fire setup (Havan Kund)',
      'Kalash with coconut and mango leaves',
      'Flowers and garlands',
      'Haldi, kumkum, rice, and essential items',
      'Vedic mantras booklet',
      'All ceremonial materials'
    ]
  },
  'griha-pravesh': {
    title: 'Griha Pravesh (Housewarming Ceremony)',
    slug: 'griha-pravesh',
    icon: '🏠',
    heroImage: 'https://images.pexels.com/photos/7152003/pexels-photo-7152003.jpeg',
    gallery: [
      'https://images.pexels.com/photos/6315702/pexels-photo-6315702.jpeg',
      'https://images.pexels.com/photos/31104752/pexels-photo-31104752.jpeg',
      'https://images.pexels.com/photos/7181865/pexels-photo-7181865.jpeg'
    ],
    significance: {
      title: 'Meaning and Significance',
      content: 'Griha Pravesh, meaning "entering the house," is an ancient Vedic ceremony performed when moving into a new home. This sacred ritual is believed to purify the space, remove any negative energies, and invoke divine blessings for prosperity, peace, and protection. The ceremony sanctifies the home as a temple where the family will live harmoniously. According to Vastu Shastra, every structure has its own energy, and Griha Pravesh aligns this energy with cosmic forces. The ritual includes Ganesh Puja for removing obstacles, Vastu Puja for balancing energies, and Navagraha Puja for planetary harmony.',
      keyPoints: [
        'Purifies and sanctifies the new home environment',
        'Removes negative energies and establishes positive vibrations',
        'Invokes blessings of Vastu Purush (deity of the dwelling)',
        'Creates protective shield around the family',
        'Aligns home energies with cosmic forces'
      ]
    },
    benefits: {
      title: 'Spiritual and Practical Benefits',
      spiritual: [
        'Divine protection for the home and all residents',
        'Blessings of Goddess Lakshmi for prosperity',
        'Positive energy circulation throughout the house',
        'Harmony between five elements (Panchabhoota)',
        'Removal of Vastu doshas and planetary afflictions'
      ],
      practical: [
        'Peaceful and harmonious family life',
        'Financial stability and growth',
        'Good health for all family members',
        'Success in all endeavors undertaken from the home',
        'Protection from accidents and negative influences'
      ]
    },
    auspiciousTime: {
      title: 'Ideal Time to Perform',
      content: 'Griha Pravesh should be performed during specific auspicious muhurats based on the lunar calendar and planetary positions. The ceremony is typically done during Uttarayana (Sun\'s northward journey) between mid-January to mid-July. Certain months and nakshatras are considered more favorable, while some periods should be strictly avoided.',
      periods: [
        'Best Months: Vaishakha (Apr-May), Jyeshtha (May-Jun), Magha (Jan-Feb), Phalguna (Feb-Mar)',
        'Favorable Nakshatras: Ashwini, Rohini, Mrigashira, Pushya, Uttara Phalguni, Hasta, Uttara Ashadha',
        'Preferred Days: Thursday, Friday, Wednesday, Monday',
        'Best Time: Morning hours (8 AM - 12 PM) are most auspicious',
        'Avoid: Adhik Maas, Kharmas, Saturdays, Tuesdays, Amavasya (new moon), eclipse periods'
      ]
    },
    procedure: {
      title: 'Key Rituals and Procedure',
      steps: [
        {
          name: 'Vastu Shanti Puja',
          description: 'Worship of Vastu Purush to harmonize energies of the five elements in the home'
        },
        {
          name: 'Ganesh Puja',
          description: 'Invocation of Lord Ganesh to remove all obstacles and ensure smooth transition'
        },
        {
          name: 'Kalash Sthapana',
          description: 'Installation of holy water pot representing cosmic energies and abundance'
        },
        {
          name: 'Navagraha Puja',
          description: 'Worship of nine planets for their favorable influence on the household'
        },
        {
          name: 'Havan (Fire Ceremony)',
          description: 'Sacred fire ritual with offerings to purify the home and invoke divine presence'
        },
        {
          name: 'Boiling of Milk',
          description: 'Milk is boiled and allowed to overflow symbolizing abundance and prosperity'
        },
        {
          name: 'First Entry Ritual',
          description: 'Family enters with right foot first carrying kalash, followed by worship'
        },
        {
          name: 'Naivedya and Aarti',
          description: 'Offering of food to deities followed by aarti and distribution of prasad'
        }
      ],
      duration: '2-3 hours'
    },
    additionalInfo: {
      title: 'Important Information',
      points: [
        'Consult with Pandit Ji to determine the most auspicious muhurat based on your horoscope',
        'Three types of Griha Pravesh: Apoorva (new construction), Sapoorva (re-entry after travel), Dwandwah (after renovation)',
        'The ceremony should be completed before sunset',
        'Family should enter together with positive mindset and clean attire',
        'It is customary to invite friends and family for blessings',
        'A coconut is broken at the entrance to ward off evil',
        'Lighting of lamps in all rooms is done to dispel darkness',
        'First meal should be cooked and consumed in the new home'
      ]
    },
    samagriIncluded: [
      'Vastu Yantra for installation',
      'Kalash with sacred items',
      'Navagraha materials',
      'Havan samagri and wood',
      'Flowers, fruits, and sweets',
      'All ceremonial items'
    ]
  },
  'navratri-puja': {
    title: 'Navratri Puja (Nine Nights of Divine Mother)',
    slug: 'navratri-puja',
    icon: '🪔',
    heroImage: 'https://images.pexels.com/photos/34473107/pexels-photo-34473107.jpeg',
    gallery: [
      'https://images.pexels.com/photos/31104752/pexels-photo-31104752.jpeg',
      'https://images.pexels.com/photos/6315702/pexels-photo-6315702.jpeg',
      'https://images.pexels.com/photos/7181865/pexels-photo-7181865.jpeg'
    ],
    significance: {
      title: 'Meaning and Significance',
      content: 'Navratri, meaning "nine nights," is one of the most sacred Hindu festivals dedicated to Goddess Durga and her nine manifestations (Navadurga). This spiritual journey represents the victory of good over evil, light over darkness. Each of the nine days is dedicated to a different form of the Divine Mother - Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri, and Siddhidatri. The festival symbolizes the three attributes of the Supreme - Tamas (inertia), Rajas (activity), and Sattva (purity). Devotees worship the feminine divine power (Shakti) that creates, preserves, and destroys the universe.',
      keyPoints: [
        'Celebration of Divine Feminine power in nine forms',
        'Represents victory of good over evil (Durga over Mahishasura)',
        'Spiritual purification through nine days of devotion',
        'Honors the creative, preservative, and destructive aspects of Shakti',
        'Most powerful time for spiritual awakening and material blessings'
      ]
    },
    benefits: {
      title: 'Spiritual and Practical Benefits',
      spiritual: [
        'Direct connection with Divine Mother\'s grace and power',
        'Purification of mind, body, and soul through devotion',
        'Awakening of inner Shakti (divine energy) within',
        'Protection from negative energies and evil forces',
        'Accelerated spiritual growth and self-realization',
        'Blessings for removal of sins and karmic debts'
      ],
      practical: [
        'Fulfillment of wishes and desires when done with devotion',
        'Prosperity and abundance in all areas of life',
        'Success in education, career, and business ventures',
        'Good health and vitality for family members',
        'Harmonious relationships and family peace',
        'Mental clarity and emotional stability'
      ]
    },
    auspiciousTime: {
      title: 'Ideal Time to Perform',
      content: 'Navratri is celebrated four times a year, but two are most prominent - Chaitra Navratri (March-April) and Sharad Navratri (September-October). Sharad Navratri is the most widely celebrated and falls during autumn season. The nine-day festival begins on Pratipada (first day) of Ashwin month and culminates on Vijayadashami (Dussehra).',
      periods: [
        'Sharad Navratri: September-October (Most auspicious and widely celebrated)',
        'Chaitra Navratri: March-April (Marks the beginning of Hindu New Year)',
        'Magha Navratri: January-February (Observed by few)',
        'Ashadha Navratri: June-July (Gupt Navratri)',
        'Kalash Sthapana: Done on first day (Pratipada) during auspicious muhurat',
        'Daily worship should be done during Brahma Muhurat or morning hours'
      ]
    },
    procedure: {
      title: 'Key Rituals and Procedure',
      steps: [
        {
          name: 'Kalash Sthapana (Day 1)',
          description: 'Installation of sacred kalash with barley seeds representing the goddess. This sets the foundation for nine days of worship'
        },
        {
          name: 'Daily Puja of Nine Forms',
          description: 'Each day worship specific form of Durga with appropriate offerings, colors, and mantras'
        },
        {
          name: 'Durga Saptashati Path',
          description: 'Recitation of 700 verses glorifying the goddess (complete or selected chapters)'
        },
        {
          name: 'Havan (Fire Ceremony)',
          description: 'Daily or on specific days, sacred fire offerings are made with specific herbs'
        },
        {
          name: 'Fasting and Prayers',
          description: 'Devotees observe various types of fasts and maintain spiritual discipline'
        },
        {
          name: 'Kanya Puja (Day 8/9)',
          description: 'Young girls are worshipped as manifestations of the goddess and offered food'
        },
        {
          name: 'Visarjan (Day 10)',
          description: 'Immersion of kalash and farewell to the goddess with request for return next year'
        },
        {
          name: 'Aarti and Bhajans',
          description: 'Daily devotional songs and aarti performed morning and evening'
        }
      ],
      duration: '9 consecutive days (1-2 hours daily worship)'
    },
    additionalInfo: {
      title: 'Important Information',
      points: [
        'Kalash must be installed during auspicious muhurat on first day',
        'Daily worship should be done consistently for all nine days without break',
        'Different colors are associated with each day for wearing and decoration',
        'Fasting rules vary - some do complete fast, others eat once, or take fruits/milk only',
        'Maintain brahmacharya (celibacy) and avoid onion, garlic, non-veg during nine days',
        'Durga Saptashati can be recited at home or by Pandit Ji',
        'Grand havan can be performed on 8th or 9th day (Durga Ashtami or Maha Navami)',
        'Kanya Puja is essential - worship 2, 9, or more young girls',
        'Avoid cutting hair, nails during the nine days',
        'Complete package available including daily puja or one-time installation'
      ]
    },
    samagriIncluded: [
      'Kalash with barley seeds',
      'Nine forms of Durga images/idols',
      'Daily puja items for nine days',
      'Durga Saptashati book',
      'Havan samagri',
      'Kanya Puja items'
    ]
  },
  'ganesh-puja': {
    title: 'Ganesh Puja (Ganpati Sthapana)',
    slug: 'ganesh-puja',
    icon: '🙏',
    heroImage: 'https://images.pexels.com/photos/33829504/pexels-photo-33829504.jpeg',
    gallery: [
      'https://images.pexels.com/photos/33642644/pexels-photo-33642644.jpeg',
      'https://images.unsplash.com/photo-1642744901889-9efbec703430',
      'https://images.pexels.com/photos/31104752/pexels-photo-31104752.jpeg'
    ],
    significance: {
      title: 'Meaning and Significance',
      content: 'Lord Ganesh, the elephant-headed deity, is revered as the remover of obstacles (Vighnaharta) and the god of beginnings, wisdom, and prosperity. Ganesh Puja is performed at the start of any new venture, ceremony, or important life event. According to Hindu mythology, Lord Ganesh is the son of Shiva and Parvati and is worshipped first among all deities. His large elephant head symbolizes wisdom and understanding, his big ears denote listening and learning, his small eyes represent concentration, and his large belly signifies digesting all good and bad in life. The mouse as his vehicle represents the ability to control desires. Ganesh Chaturthi is the most prominent festival celebrating his birth.',
      keyPoints: [
        'Remover of obstacles and harbinger of success',
        'God of wisdom, knowledge, and new beginnings',
        'Must be worshipped before starting any auspicious work',
        'Bestows prosperity, good fortune, and fulfillment',
        'Patron deity of arts, sciences, and intellect'
      ]
    },
    benefits: {
      title: 'Spiritual and Practical Benefits',
      spiritual: [
        'Removal of obstacles in spiritual path',
        'Development of wisdom and discrimination (Viveka)',
        'Blessings for successful completion of all undertakings',
        'Protection from negative energies and evil eye',
        'Enhancement of intellect and memory power',
        'Spiritual growth and self-control'
      ],
      practical: [
        'Success in new business ventures and projects',
        'Excellent academic performance and learning abilities',
        'Prosperity and abundance in household',
        'Harmonious family relationships',
        'Good fortune and lucky opportunities',
        'Problem-solving abilities and clarity of thought'
      ]
    },
    auspiciousTime: {
      title: 'Ideal Time to Perform',
      content: 'While Ganesh Puja can be performed any day (especially Wednesdays and Chaturthi tithis), the most auspicious time is during Ganesh Chaturthi festival. This falls on the fourth day (Chaturthi) of the waxing moon in the Hindu month of Bhadrapada (August-September). The festival lasts for 10 days, though many worship for 1.5, 3, 5, 7, or 11 days.',
      periods: [
        'Ganesh Chaturthi: Bhadrapada Shukla Chaturthi (Aug-Sep) - Most auspicious',
        'Every Chaturthi: 4th day of waxing and waning moon (Monthly)',
        'Sankashti Chaturthi: Chaturthi during Krishna Paksha (waning moon)',
        'Angarki Chaturthi: When Chaturthi falls on Tuesday (Very powerful)',
        'Wednesdays: Regular day for Ganesh worship',
        'Avoid: Ganesh Chaturthi during evening (Bhadra Kaal) on first day'
      ]
    },
    procedure: {
      title: 'Key Rituals and Procedure',
      steps: [
        {
          name: 'Ganpati Sthapana',
          description: 'Installation of Ganesh idol on a decorated platform or altar with sacred mantras'
        },
        {
          name: 'Prana Pratishtha',
          description: 'Invocation of life force into the idol through Vedic mantras and rituals'
        },
        {
          name: 'Shodashopachara Puja',
          description: 'Sixteen-step worship including bathing, dressing, offering flowers, incense, lamp, and food'
        },
        {
          name: 'Offering of Modak',
          description: 'Sweet modak (Lord Ganesh\'s favorite) is offered along with durva grass (21 blades)'
        },
        {
          name: 'Ganesh Atharvashirsha',
          description: 'Recitation of powerful Ganesh Atharvashirsha hymn and 108 names of Ganesh'
        },
        {
          name: 'Aarti',
          description: 'Devotional aarti (Sukhkarta Dukhharta) with camphor lamp and bells'
        },
        {
          name: 'Daily Worship',
          description: 'For multi-day celebrations, puja is performed morning and evening'
        },
        {
          name: 'Visarjan',
          description: 'Immersion ceremony with prayers for Ganesh to return next year'
        }
      ],
      duration: '1-2 hours for installation, 30-45 minutes daily worship'
    },
    additionalInfo: {
      title: 'Important Information',
      points: [
        'Eco-friendly clay idols are recommended over plaster of Paris',
        'Idol size can be chosen based on space availability (small to large)',
        'Red and yellow colors are auspicious for decoration',
        'Must offer durva grass (doob grass) - it is mandatory for Ganesh worship',
        'Modak (sweet dumpling) is Lord Ganesh\'s favorite prasad',
        'Wednesday fasting and worship brings special blessings',
        'During Ganesh Chaturthi, avoid looking at moon on first day (causes false blame)',
        'Chanting "Om Gan Ganapataye Namaha" 108 times is highly beneficial',
        'Ideal for starting new business, entering new home, beginning studies',
        'Can be performed as home installation or simple puja'
      ]
    },
    samagriIncluded: [
      'Ganesh idol guidance',
      'Durva grass (21 blades)',
      'Red flowers and garland',
      'Modak and fruits',
      'Complete puja materials',
      'Ganesh mantras booklet'
    ]
  },
  'satyanarayan-katha': {
    title: 'Satyanarayan Katha (Lord Vishnu Worship)',
    slug: 'satyanarayan-katha',
    icon: '📿',
    heroImage: 'https://images.pexels.com/photos/8751531/pexels-photo-8751531.jpeg',
    gallery: [
      'https://images.pexels.com/photos/33362142/pexels-photo-33362142.jpeg',
      'https://images.pexels.com/photos/6315702/pexels-photo-6315702.jpeg',
      'https://images.pexels.com/photos/31104752/pexels-photo-31104752.jpeg'
    ],
    significance: {
      title: 'Meaning and Significance',
      content: 'Satyanarayan Katha is a sacred ceremony dedicated to Lord Vishnu in his aspect as Satyanarayan (Truth-Deity). This puja is performed to invoke the blessings of Lord Vishnu for prosperity, peace, and fulfillment of wishes. The ceremony includes the recitation of the Satyanarayan Katha (story) from the Skanda Purana, which narrates five divine stories demonstrating the power of devotion and consequences of faith and faithlessness. The ritual emphasizes the importance of truth (Satya), devotion, and gratitude. It is believed that Lord Vishnu, pleased with sincere devotion, removes obstacles and grants wishes. The puja can be performed on any auspicious occasion, after fulfillment of wishes, or regularly on full moon days.',
      keyPoints: [
        'Worship of Lord Vishnu in his benevolent Satyanarayan form',
        'Based on stories from Skanda Purana demonstrating power of faith',
        'Emphasizes importance of truth and devotion',
        'Performed for prosperity, peace, and wish fulfillment',
        'One of the most popular and accessible Vedic ceremonies'
      ]
    },
    benefits: {
      title: 'Spiritual and Practical Benefits',
      spiritual: [
        'Blessings of Lord Vishnu for spiritual progress',
        'Purification of sins and negative karma',
        'Strengthening of faith and devotion',
        'Protection from evil influences and negative energies',
        'Peace of mind and mental clarity',
        'Fulfillment of righteous desires'
      ],
      practical: [
        'Success in business and financial ventures',
        'Resolution of family conflicts and disputes',
        'Good health and longevity for family members',
        'Prosperity and abundance in household',
        'Success in education and career',
        'Harmonious married life and relationships'
      ]
    },
    auspiciousTime: {
      title: 'Ideal Time to Perform',
      content: 'Satyanarayan Puja can be performed on any auspicious day, but certain days and occasions are considered especially favorable. The most popular time is on Purnima (full moon day) every month. It is also commonly performed after fulfillment of wishes, before or after important life events, or when seeking divine blessings.',
      periods: [
        'Purnima (Full Moon Day): Most auspicious - monthly observance brings great benefits',
        'Ekadashi: 11th day of lunar fortnight (both waxing and waning moon)',
        'Special Occasions: After wish fulfillment, before marriage, after childbirth, housewarming',
        'Kartik Purnima (Oct-Nov): Most powerful full moon of the year',
        'Thursday: Day of Lord Vishnu (Brihaspativar)',
        'Morning Time: Preferably during morning hours (8 AM - 12 PM)'
      ]
    },
    procedure: {
      title: 'Key Rituals and Procedure',
      steps: [
        {
          name: 'Ganesh Puja',
          description: 'Beginning with worship of Lord Ganesh to remove obstacles'
        },
        {
          name: 'Kalash Sthapana',
          description: 'Installation of sacred water pot representing Lord Vishnu'
        },
        {
          name: 'Panchopachara Puja',
          description: 'Five-fold worship of Satyanarayan with sacred offerings'
        },
        {
          name: 'Katha Paath',
          description: 'Recitation of five chapters of Satyanarayan Katha story in Hindi/Sanskrit'
        },
        {
          name: 'Sankalp',
          description: 'Taking of vow and stating the purpose of performing the puja'
        },
        {
          name: 'Prasad Offering',
          description: 'Special panchamrit and banana-gram-jaggery prasad is offered'
        },
        {
          name: 'Aarti',
          description: 'Devotional aarti with camphor lamp and singing of hymns'
        },
        {
          name: 'Prasad Distribution',
          description: 'Distribution of prasad to all attendees - must be consumed as blessing'
      }
      ],
      duration: '2-3 hours'
    },
    additionalInfo: {
      title: 'Important Information',
      points: [
        'Entire family should be present during the katha recitation',
        'Prasad (sheera made of banana, jaggery, and gram flour) is essential part',
        'Everyone must consume the prasad - it is considered disrespectful to refuse',
        'Yellow clothes and decorations are auspicious for this puja',
        'Fasting is optional but devotees often fast until prasad is offered',
        'Number of attendees doesn\'t matter - even one person can perform',
        'Can be performed at home or in temple',
        'Stories teach important life lessons about faith, truth, and devotion',
        'Ideal to perform after recovery from illness, business success, or wish fulfillment',
        'Regular monthly observance (on Purnima) brings continuous blessings'
      ]
    },
    samagriIncluded: [
      'Kalash with sacred items',
      'Satyanarayan photo/idol',
      'Katha booklet (Hindi/Sanskrit)',
      'Prasad ingredients',
      'Yellow cloth and decorations',
      'All puja materials'
    ]
  },
  'naamkaran-sanskar': {
    title: 'Naamkaran Sanskar (Baby Naming Ceremony)',
    slug: 'naamkaran-sanskar',
    icon: '👶',
    heroImage: 'https://images.pexels.com/photos/35204633/pexels-photo-35204633.jpeg',
    gallery: [
      'https://images.pexels.com/photos/8751531/pexels-photo-8751531.jpeg',
      'https://images.pexels.com/photos/31104752/pexels-photo-31104752.jpeg',
      'https://images.pexels.com/photos/6315702/pexels-photo-6315702.jpeg'
    ],
    significance: {
      title: 'Meaning and Significance',
      content: 'Naamkaran Sanskar is one of the 16 essential sanskars (sacraments) in Hindu tradition, performed to give a baby its official name. This ceremony is not merely about choosing a name but is a sacred ritual that imparts the first social identity to the newborn. The name chosen has profound significance as it is believed to influence the child\'s personality, destiny, and character throughout life. In Vedic tradition, the name is considered the first gift parents give their child. The ceremony includes prayers for the child\'s health, longevity, intelligence, and prosperity. The name is usually chosen based on the birth nakshatra (star), rashi (zodiac sign), and numerology to ensure auspicious vibrations.',
      keyPoints: [
        'Fifth among the 16 essential Hindu sanskars',
        'Establishes child\'s social and spiritual identity',
        'Name influences personality and destiny throughout life',
        'Performed with Vedic rituals and blessings',
        'Involves family, friends, and divine invocation'
      ]
    },
    benefits: {
      title: 'Spiritual and Practical Benefits',
      spiritual: [
        'Divine blessings for child\'s spiritual growth',
        'Protection from evil eye and negative energies',
        'Auspicious start to the child\'s life journey',
        'Positive karmic impressions from sacred ceremony',
        'Blessings of deities and ancestors for the child',
        'Harmonious vibrations from properly chosen name'
      ],
      practical: [
        'Establishes formal identity in family and society',
        'Creates positive psychological impression',
        'Name chosen ensures astrological compatibility',
        'Brings family together in joyous celebration',
        'Cultural and traditional continuity',
        'Auspicious phonetic vibrations influence child\'s nature'
      ]
    },
    auspiciousTime: {
      title: 'Ideal Time to Perform',
      content: 'According to Hindu scriptures, Naamkaran should ideally be performed on the 10th, 11th, or 12th day after birth. However, in modern practice, it is often performed on the 11th day, 21st day, or even later (101st day or first birthday) depending on family traditions and practical considerations. The ceremony should be performed during an auspicious muhurat determined by the child\'s horoscope.',
      periods: [
        'Traditional: 10th, 11th, or 12th day after birth (Most authentic)',
        'Extended: 21st day or within first month (Commonly practiced)',
        'Alternative: 101st day or 6th month (As per family convenience)',
        'First Birthday: If not done earlier (Acceptable)',
        'Nakshatra: Choose day when favorable nakshatra is present',
        'Time: Morning hours during auspicious muhurat'
      ]
    },
    procedure: {
      title: 'Key Rituals and Procedure',
      steps: [
        {
          name: 'Ganesh Puja',
          description: 'Invocation of Lord Ganesh for obstacle-free ceremony and blessings'
        },
        {
          name: 'Punyahavachanam',
          description: 'Purification ritual with holy water and mantras'
        },
        {
          name: 'Name Selection',
          description: 'Name is chosen based on birth nakshatra, rashi, and numerology consultation'
        },
        {
          name: 'Naming Ritual',
          description: 'Father whispers the chosen name in child\'s right ear using sacred mantras'
        },
        {
          name: 'Shashthi Puja',
          description: 'Worship of Shashthi Devi (goddess who protects children) for the baby\'s wellbeing'
        },
        {
          name: 'Writing Ceremony',
          description: 'Name is written on rice or golden plate with sacred writing'
        },
        {
          name: 'Blessing Ceremony',
          description: 'Elders bless the child with gifts, gold, silver, and words of blessing'
        },
        {
          name: 'Prasad Distribution',
          description: 'Distribution of sweets and feast for family and friends'
        }
      ],
      duration: '1.5 - 2 hours'
    },
    additionalInfo: {
      title: 'Important Information',
      points: [
        'Consult Pandit Ji for nakshatra-based name suggestions before ceremony',
        'Name should have positive meaning and auspicious letter based on birth chart',
        'Modern practice: Keep an official name and a pet name (dak naam)',
        'Baby should be bathed and dressed in new clothes before ceremony',
        'Mother should also be ritually purified (after 10-day post-birth period)',
        'Gold or silver ornament is traditionally gifted to the baby',
        'Invite close family and friends for the auspicious occasion',
        'Photography and videography can be done to preserve memories',
        'Can be combined with other ceremonies like ear piercing in some traditions',
        'Name certificate or scroll can be created as memento'
      ]
    },
    samagriIncluded: [
      'Name consultation based on nakshatra',
      'Shashthi Devi puja items',
      'Rice/gold plate for writing',
      'Sacred thread and items',
      'Vedic mantras booklet',
      'All ceremonial materials'
    ]
  },
  'vastu-shanti': {
    title: 'Vastu Shanti Puja (Space Purification)',
    slug: 'vastu-shanti',
    icon: '🧘',
    heroImage: 'https://images.pexels.com/photos/6315702/pexels-photo-6315702.jpeg',
    gallery: [
      'https://images.pexels.com/photos/7181865/pexels-photo-7181865.jpeg',
      'https://images.pexels.com/photos/31104752/pexels-photo-31104752.jpeg',
      'https://images.pexels.com/photos/33362142/pexels-photo-33362142.jpeg'
    ],
    significance: {
      title: 'Meaning and Significance',
      content: 'Vastu Shanti Puja is a powerful Vedic ceremony performed to rectify Vastu doshas (defects) in a building or land and to harmonize the five elements (earth, water, fire, air, and space). Vastu Shastra is the ancient Indian science of architecture that establishes harmony between cosmic energies and the built environment. When a structure has Vastu defects - due to improper orientation, wrong placement of rooms, or imbalance in elements - it can cause various problems in health, wealth, and relationships. This puja appeases Vastu Purush (the deity presiding over the plot) and balances energies. It includes worship of 45 Vastu deities, Navagraha (nine planets), and Panchabhoota (five elements) to create a protective shield and positive energy field.',
      keyPoints: [
        'Rectifies Vastu doshas in buildings and properties',
        'Harmonizes five elements (Panchabhoota) in living space',
        'Appeases Vastu Purush and 45 energy deities',
        'Creates protective energy shield around property',
        'Balances planetary influences through Navagraha puja'
      ]
    },
    benefits: {
      title: 'Spiritual and Practical Benefits',
      spiritual: [
        'Removal of negative energies and evil influences',
        'Balancing of cosmic energies in living space',
        'Protection from unseen forces and entities',
        'Harmonization with natural elements',
        'Spiritual peace and positive vibrations',
        'Divine grace and blessings on the property'
      ],
      practical: [
        'Improved health of family members',
        'Financial stability and business growth',
        'Harmonious family relationships',
        'Mental peace and emotional stability',
        'Success in career and endeavors',
        'Better sleep quality and energy levels',
        'Resolution of unexplained problems',
        'Increased property value and auspiciousness'
      ]
    },
    auspiciousTime: {
      title: 'Ideal Time to Perform',
      content: 'Vastu Shanti Puja should be performed during auspicious planetary positions, preferably when buying property, starting construction, during construction problems, after renovation, or when experiencing persistent issues despite living in a space. The ceremony should be done on an auspicious day determined by panchang (Hindu calendar).',
      periods: [
        'Best Time: Before starting construction of new building',
        'During Construction: If Vastu principles couldn\'t be followed',
        'After Purchase: When buying existing property with Vastu defects',
        'Problem Period: When experiencing health, financial, or relationship issues',
        'After Renovation: When major changes are made to structure',
        'Auspicious Days: Thursday, Friday, or during favorable nakshatras',
        'Avoid: Tuesdays, Saturdays, Rahu Kaal, and inauspicious tithis'
      ]
    },
    procedure: {
      title: 'Key Rituals and Procedure',
      steps: [
        {
          name: 'Ganesh Puja',
          description: 'Worship of Lord Ganesh to remove obstacles from the ceremony'
        },
        {
          name: 'Vastu Purush Mandala Puja',
          description: 'Worship of Vastu Purush and 45 energy deities in their specific directions'
        },
        {
          name: 'Navagraha Puja',
          description: 'Worship of nine planets to ensure their favorable influence'
        },
        {
          name: 'Panchabhoota Puja',
          description: 'Worship of five elements (earth, water, fire, air, space) for balance'
        },
        {
          name: 'Directional Puja',
          description: 'Worship of deities of eight directions (Ashtadikpalakas)'
        },
        {
          name: 'Vastu Havan',
          description: 'Sacred fire ceremony with 108 offerings using specific herbs'
        },
        {
          name: 'Vastu Yantra Installation',
          description: 'Installation of energized Vastu yantra at appropriate location'
        },
        {
          name: 'Purnahuti and Prayer',
          description: 'Final offerings and prayers for lasting peace and prosperity'
        }
      ],
      duration: '3-4 hours'
    },
    additionalInfo: {
      title: 'Important Information',
      points: [
        'Vastu consultation can be done before the puja to identify specific defects',
        'Major structural changes are ideal but not always necessary',
        'Puja can significantly reduce effects of Vastu doshas through energy balancing',
        'Entire family should be present during the ceremony',
        'The property should be cleaned thoroughly before the puja',
        'Vastu Yantra installed during puja provides continuous protection',
        'Can be performed for home, office, shop, factory, or any property',
        'Recommended to perform annually or when major life changes occur',
        'Pandit Ji will explain specific remedies for identified Vastu defects',
        'Combination of Vastu corrections and puja gives best results',
        'Follow-up simple remedies may be suggested (like color, mirror, plant placement)'
      ]
    },
    samagriIncluded: [
      'Vastu Purush Mandala diagram',
      'Navagraha puja items',
      'Five element representations',
      'Energized Vastu Yantra',
      'Havan samagri and herbs',
      'All directional worship materials'
    ]
  },
  'pitru-paksha-shraddh': {
    title: 'Pitru Paksha Shraddh (Ancestral Offerings)',
    slug: 'pitru-paksha-shraddh',
    icon: '🕉️',
    heroImage: 'https://images.pexels.com/photos/34753111/pexels-photo-34753111.jpeg',
    gallery: [
      'https://images.pexels.com/photos/33362142/pexels-photo-33362142.jpeg',
      'https://images.pexels.com/photos/8751531/pexels-photo-8751531.jpeg',
      'https://images.pexels.com/photos/31104752/pexels-photo-31104752.jpeg'
    ],
    significance: {
      title: 'Meaning and Significance',
      content: 'Pitru Paksha, also called Mahalaya Paksha, is a 16-day period dedicated to performing Shraddh (ancestral rites) for deceased family members. According to Hindu beliefs, the souls of ancestors visit their descendants during this period to receive offerings and blessings. Shraddh is performed to express gratitude, seek forgiveness for any negligence, and provide peace to departed souls. The ritual helps ancestors attain higher realms and ensures their blessings flow to the living family. It is based on the principle that our existence is indebted to our ancestors (Pitru Rinn). The offerings made during Shraddh - food, water, sesame seeds, and prayers - provide nourishment to the souls in their subtle realm. Performing Shraddh with devotion removes Pitru Dosha from the family horoscope.',
      keyPoints: [
        'Sacred 16-day period for honoring deceased ancestors',
        'Repayment of debt to forefathers (Pitru Rinn)',
        'Provides peace and spiritual nourishment to departed souls',
        'Removes Pitru Dosha from family lineage',
        'Ensures ancestors\' blessings for prosperity and wellbeing'
      ]
    },
    benefits: {
      title: 'Spiritual and Practical Benefits',
      spiritual: [
        'Liberation and peace for departed souls',
        'Removal of Pitru Dosha (ancestral curse) from horoscope',
        'Blessings from satisfied ancestors',
        'Spiritual purification of family lineage',
        'Protection from negative ancestral karma',
        'Fulfillment of duties towards forefathers'
      ],
      practical: [
        'Resolution of chronic family problems',
        'Success in endeavors that were previously blocked',
        'Improved family harmony and relationships',
        'Better luck and opportunities in life',
        'Success in marriage and childbirth matters',
        'Financial stability and growth',
        'Good health for family members',
        'Protection from accidents and misfortunes'
      ]
    },
    auspiciousTime: {
      title: 'Ideal Time to Perform',
      content: 'Pitru Paksha occurs during the Krishna Paksha (waning moon) of Bhadrapada/Ashwin month (September-October). Shraddh should be performed on the tithi (lunar day) corresponding to the ancestor\'s death date. If the death date is unknown, it can be performed on Amavasya (Mahalaya Amavasya), which is universal for all ancestors.',
      periods: [
        'Pitru Paksha: 16 days during Ashwin Krishna Paksha (Sept-Oct)',
        'Specific Tithi: Day matching ancestor\'s death date',
        'Mahalaya Amavasya: Last day - most important, suitable for all ancestors',
        'Purnima Shraddh: Full moon day of Bhadrapada month (day before Pitru Paksha starts)',
        'Annual Death Anniversary: Can be performed any time during year',
        'Time: Afternoon (Kutup Kaal or Aparahna Kaal) is most appropriate',
        'Special: Gaya Shraddh at Gaya (Bihar) is considered most powerful'
      ]
    },
    procedure: {
      title: 'Key Rituals and Procedure',
      steps: [
        {
          name: 'Sankalp',
          description: 'Taking vow mentioning gotra, ancestor\'s name, and purpose of Shraddh'
        },
        {
          name: 'Tilodak',
          description: 'Offering water mixed with sesame seeds to ancestors'
        },
        {
          name: 'Pind Daan',
          description: 'Offering of pind (rice balls) representing body of ancestors'
        },
        {
          name: 'Brahman Bhojan',
          description: 'Feeding Brahmins who represent ancestors (most important part)'
        },
        {
          name: 'Cow Feeding',
          description: 'Offering food to cow, crow, and dog as part of ritual'
        },
        {
          name: 'Tarpan',
          description: 'Water offerings to ancestors with sacred mantras'
        },
        {
          name: 'Pitru Mantras',
          description: 'Recitation of specific mantras for peace of departed souls'
        },
        {
          name: 'Daan (Charity)',
          description: 'Donations of clothes, food, utensils, or money in ancestors\' names'
        }
      ],
      duration: '2-3 hours'
    },
    additionalInfo: {
      title: 'Important Information',
      points: [
        'Know your ancestor\'s death tithi (lunar date) before the ceremony',
        'If death date unknown, perform on Mahalaya Amavasya (covers all)',
        'Feeding Brahmins is the most crucial part - represents feeding ancestors',
        'Shraddh food should be simple, sattvic, and freshly prepared',
        'Non-vegetarian food, onion, garlic are strictly prohibited',
        'Traditional menu: kheer, puri, vegetables, rice, dal',
        'Black sesame seeds are essential offering material',
        'Crow eating the offering is considered auspicious sign of acceptance',
        'Males of the family traditionally perform Shraddh',
        'Can be performed at home, temple, or sacred places like Gaya, Prayagraj, Haridwar',
        'Entire family benefits from this ritual',
        'Those with Pitru Dosha in horoscope must perform regularly'
      ]
    },
    samagriIncluded: [
      'Black sesame seeds (til)',
      'Pind making materials (rice, milk, ghee)',
      'Sacred water pot',
      'Brahmin bhojan arrangement',
      'Charity items',
      'All ritual materials'
    ]
  }
}

export default function ServicePage() {
  const params = useParams()
  const router = useRouter()
  const service = servicesData[params.slug]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Button onClick={() => router.push('/')} className="bg-orange-600 hover:bg-orange-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back Home
          </Button>
        </div>
      </div>
    )
  }

  const whatsappMessage = encodeURIComponent(`Namaste! I would like to book ${service.title}. Please share details.`)
  const whatsappLink = `https://wa.me/919876543210?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl">
                🕉️
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-orange-600">Pandit Ji Services</h1>
                <p className="text-xs text-gray-600">Delhi NCR</p>
              </div>
            </Link>

            <div className="flex items-center space-x-3">
              <Link href="/#contact">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${service.heroImage})`,
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/80" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <Link href="/" className="text-orange-200 hover:text-orange-100 inline-flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Link>
            </div>
            <div className="text-6xl mb-4">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-orange-100">Complete Vedic Ceremony with Traditional Rituals</p>
          </div>
        </div>
      </section>

      {/* Quick Action Bar */}
      <div className="bg-orange-50 border-b border-orange-100 sticky top-[72px] z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Booking
              </Button>
            </a>
            <a href="tel:+919876543210">
              <Button size="sm" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                <Phone className="w-4 h-4 mr-2" />
                Call: +91 9876543210
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Significance Section */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-bold text-gray-900">{service.significance.title}</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">{service.significance.content}</p>
                <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Spiritual Aspects:</h3>
                  <ul className="space-y-2">
                    {service.significance.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{service.benefits.title}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-orange-200">
                  <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
                    <CardTitle className="text-xl text-orange-600">Spiritual Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {service.benefits.spiritual.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-200">
                  <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
                    <CardTitle className="text-xl text-orange-600">Practical Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {service.benefits.practical.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Auspicious Time Section */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-bold text-gray-900">{service.auspiciousTime.title}</h2>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200">
                <p className="text-gray-700 leading-relaxed mb-6">{service.auspiciousTime.content}</p>
                <div className="space-y-3">
                  {service.auspiciousTime.periods.map((period, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Procedure Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{service.procedure.title}</h2>
              <div className="space-y-4">
                {service.procedure.steps.map((step, index) => (
                  <Card key={index} className="border-l-4 border-orange-600 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.name}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 bg-orange-50 p-4 rounded-xl">
                <p className="text-gray-700">
                  <strong>Estimated Duration:</strong> {service.procedure.duration}
                </p>
              </div>
            </section>

            {/* Gallery Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.gallery.map((image, index) => (
                  <div key={index} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
                    <img
                      src={image}
                      alt={`${service.title} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Info Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{service.additionalInfo.title}</h2>
              <Card className="border-2 border-orange-200">
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {service.additionalInfo.points.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Booking Card */}
              <Card className="border-2 border-orange-600 shadow-xl">
                <CardHeader className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
                  <CardTitle className="text-2xl">Book This Puja</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-gray-700">Schedule your {service.title} with experienced Pandit Ji</p>
                  
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Booking
                    </Button>
                  </a>
                  
                  <a href="tel:+919876543210" className="block">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </Button>
                  </a>

                  <div className="pt-4 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>15+ Years Experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Authentic Vedic Rituals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Free Muhurat Consultation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>All Samagri Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Samagri Included */}
              <Card>
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-lg">Samagri Included</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {service.samagriIncluded.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-orange-600">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Phone className="w-4 h-4 text-orange-600" />
                      <span>+91 9876543210</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MessageCircle className="w-4 h-4 text-orange-600" />
                      <span>+91 9876543210</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Floating Call Button */}
      <a
        href="tel:+919876543210"
        className="fixed bottom-24 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  )
}