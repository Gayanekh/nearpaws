// All illustrative content lives here. Everything below is fictional sample data.
// Change BRAND or any caregiver and the whole prototype updates.
import type { Caregiver, Service, StartAction, StayDetail, Step, TrustItem } from '../types'

export const BRAND = {
  name: 'NearPaws',
  tagline: 'Trusted care for your pet, while you are away',
  note: 'Temporary brand name',
}

export const PROTOTYPE_NOTICE =
  'Interactive prototype. Caregivers, prices, reviews and availability are illustrative. Nothing you enter is sent or saved.'

export const AREAS = ['Maple Grove', 'Riverside', 'Old Orchard', 'Harbor Hill', 'Cedar Park']

export const CARE_TYPE_LABELS = {
  'caregiver-home': "At the caregiver's home",
  'owner-home': 'At your home',
} as const

export const PET_SIZE_LABELS = {
  small: 'Small (under 10 kg)',
  medium: 'Medium (10–25 kg)',
  large: 'Large (over 25 kg)',
} as const

export const HANDOVER_LABELS = {
  'drop-off': 'You drop off and pick up',
  pickup: 'Pickup and drop-off available',
  both: 'Either works',
} as const

export const SERVICES: Service[] = [
  {
    id: 'caregiver-home',
    title: "Stay at a caregiver's home",
    description: 'Your pet joins a real household, with a routine, a comfy spot and one-to-one attention.',
    icon: 'home',
    detail: 'Best for pets who enjoy company.',
  },
  {
    id: 'owner-home',
    title: 'Care at your home',
    description: 'A caregiver visits or stays over, so your pet keeps their own bed, smells and schedule.',
    icon: 'key',
    detail: 'Best for pets who dislike change.',
  },
  {
    id: 'transport',
    title: 'Optional pickup and drop-off',
    description: 'Some caregivers can collect and return your pet. Others ask you to hand over in person.',
    icon: 'car',
    detail: 'Each profile says which applies.',
  },
]

export const CAREGIVERS: Caregiver[] = [
  {
    id: 'mara',
    name: 'Mara',
    neighborhood: 'Maple Grove, near the community garden',
    area: 'Maple Grove',
    experienceYears: 6,
    careStyle: 'Calm and routine-led',
    tagline: 'Quiet days, steady walks and lots of couch time.',
    bio: 'Mara works from home and plans each day around walks, meals and naps. She has looked after shy and senior dogs for six years and sends a photo update every evening.',
    careTypes: ['caregiver-home', 'owner-home'],
    petSizes: ['small', 'medium'],
    animals: ['Dogs', 'Cats'],
    handover: 'both',
    pricePerNight: 42,
    home: { type: 'Two-bedroom house', outdoor: 'Fenced back garden', otherPets: 'One senior cat', hours: 'Home most of the day' },
    houseRules: ['No more than two guests at a time', 'Pets sleep indoors, never alone outside', 'Updates shared once or twice a day'],
    includes: ['Two walks a day', 'Meals as you describe', 'Daily photo update'],
    scene: 'cozy',
    review: { quote: 'Sample review: She followed our dog’s feeding routine to the letter.', author: 'Illustrative owner' },
  },
  {
    id: 'jonas',
    name: 'Jonas',
    neighborhood: 'Riverside, close to the towpath',
    area: 'Riverside',
    experienceYears: 4,
    careStyle: 'Active and outdoorsy',
    tagline: 'Long riverside walks for dogs with energy to spare.',
    bio: 'Jonas is a former trail guide who loves long walks. He suits energetic dogs who need real exercise, and he keeps groups small.',
    careTypes: ['caregiver-home'],
    petSizes: ['medium', 'large'],
    animals: ['Dogs'],
    handover: 'pickup',
    pricePerNight: 48,
    home: { type: 'Ground-floor flat with direct garden access', outdoor: 'Shared secure garden', otherPets: 'No other pets', hours: 'Home mornings and evenings' },
    houseRules: ['Dogs only, one family at a time', 'Dogs are never left alone for more than two hours', 'Pickup within the Riverside area'],
    includes: ['Three walks a day', 'Pickup and drop-off', 'Evening update message'],
    scene: 'garden',
    review: { quote: 'Sample review: Our husky came home tired and very happy.', author: 'Illustrative owner' },
  },
  {
    id: 'priya',
    name: 'Priya',
    neighborhood: 'Old Orchard, quiet residential street',
    area: 'Old Orchard',
    experienceYears: 9,
    careStyle: 'Gentle, experienced with medication',
    tagline: 'Patient care for older pets and special routines.',
    bio: 'Priya has nine years of experience, including pets who need daily medication. She is comfortable with detailed care notes and gives clear updates.',
    careTypes: ['caregiver-home', 'owner-home'],
    petSizes: ['small', 'medium', 'large'],
    animals: ['Dogs', 'Cats', 'Rabbits'],
    handover: 'both',
    pricePerNight: 55,
    home: { type: 'Detached house', outdoor: 'Large fenced garden', otherPets: 'None', hours: 'Home all day' },
    houseRules: ['Medication given exactly as written', 'Calm household, no young children', 'Owner shares vet contact before the stay'],
    includes: ['Medication support', 'Two walks a day', 'Two updates a day'],
    scene: 'farmhouse',
    review: { quote: 'Sample review: She handled our cat’s medicine without any fuss.', author: 'Illustrative owner' },
  },
  {
    id: 'theo',
    name: 'Theo',
    neighborhood: 'Harbor Hill, short walk from the park',
    area: 'Harbor Hill',
    experienceYears: 3,
    careStyle: 'Playful and sociable',
    tagline: 'Good for young dogs who like games and new friends.',
    bio: 'Theo is a student who works flexible hours. He loves playtime and training basics, and he is happy to follow your commands and routines.',
    careTypes: ['caregiver-home', 'owner-home'],
    petSizes: ['small', 'medium'],
    animals: ['Dogs'],
    handover: 'drop-off',
    pricePerNight: 36,
    home: { type: 'Third-floor apartment with lift', outdoor: 'Park two minutes away', otherPets: 'One friendly dog', hours: 'Home most evenings and weekends' },
    houseRules: ['Meet-and-greet before first stay', 'No off-lead walks near roads', 'Drop-off and pickup at the apartment'],
    includes: ['Three short walks a day', 'Play sessions', 'Photo update each day'],
    scene: 'apartment',
    review: { quote: 'Sample review: Lots of play and great photos.', author: 'Illustrative owner' },
  },
  {
    id: 'elena',
    name: 'Elena',
    neighborhood: 'Cedar Park, tree-lined avenue',
    area: 'Cedar Park',
    experienceYears: 7,
    careStyle: 'Cat specialist, very quiet home',
    tagline: 'Peaceful visits and stays for cats and small pets.',
    bio: 'Elena has looked after cats for seven years. She visits your home or hosts in a quiet spare room set up for cats, depending on what suits yours.',
    careTypes: ['caregiver-home', 'owner-home'],
    petSizes: ['small'],
    animals: ['Cats', 'Small pets'],
    handover: 'both',
    pricePerNight: 30,
    home: { type: 'Small house with a cat room', outdoor: 'Enclosed catio', otherPets: 'None', hours: 'Home most days' },
    houseRules: ['One household of cats at a time', 'Cats stay indoors', 'Litter and feeding handled as you describe'],
    includes: ['Feeding and litter care', 'Play and cuddle time', 'Daily update'],
    scene: 'cozy',
    review: { quote: 'Sample review: Our shy cat was relaxed on day one.', author: 'Illustrative owner' },
  },
  {
    id: 'sam',
    name: 'Sam',
    neighborhood: 'Maple Grove, east side',
    area: 'Maple Grove',
    experienceYears: 5,
    careStyle: 'Family-friendly, structured days',
    tagline: 'A lively family home with a big garden for larger dogs.',
    bio: 'Sam and family host larger dogs in a home with a big garden. Days are structured: walk, play, rest, repeat, with plenty of attention.',
    careTypes: ['caregiver-home'],
    petSizes: ['medium', 'large'],
    animals: ['Dogs'],
    handover: 'both',
    pricePerNight: 50,
    home: { type: 'Family house', outdoor: 'Large fenced garden', otherPets: 'One gentle labrador', hours: 'Someone is always home' },
    houseRules: ['Children are taught how to approach dogs', 'Dogs are introduced slowly', 'Pickup possible within Maple Grove'],
    includes: ['Garden play', 'Two walks a day', 'Daily photo update'],
    scene: 'garden',
    review: { quote: 'Sample review: A real home, not a kennel. We were so relieved.', author: 'Illustrative owner' },
  },
]

export const STEPS: Step[] = [
  { title: 'Share your pet’s details', description: 'Describe their routine, food, medication and quirks once, in your own words.' },
  { title: 'Choose a caregiver', description: 'Compare profiles, homes and neighborhoods, then pick the person who fits your pet.' },
  { title: 'Arrange the care', description: 'Request dates, agree on handover, and send everything before the stay begins.' },
]

export const STAY_DETAILS: StayDetail[] = [
  { title: 'The care space', description: 'See where your pet will sleep, play and rest, plus garden or outdoor access.', scene: 'cozy' },
  { title: 'The caregiver', description: 'Read about their experience, care style and how often they send updates.', scene: 'farmhouse' },
  { title: 'The house rules', description: 'Know about guests, other pets, alone time and how medication is handled.', scene: 'apartment' },
  { title: 'The neighborhood', description: 'We show an approximate area only. Exact addresses stay private until a stay is agreed.', scene: 'garden' },
]

export const TRUST_ITEMS: TrustItem[] = [
  { title: 'Profiles with detail', description: 'Each profile explains the home, the rules and who else lives there.' },
  { title: 'Approximate locations', description: 'Public pages show a neighborhood, never a private address.' },
  { title: 'Care notes up front', description: 'Food, medication, behavior and emergency contacts are shared before any stay.' },
  { title: 'Clear handover options', description: 'You see whether drop-off, pickup or both are available before you request.' },
]

export const FAQ_PROTOTYPE_NOTE =
  'In this prototype there is no real vetting, booking, payment or messaging. A real service would need identity checks, insurance and clear policies.'

export const FAQS = [
  { question: 'Is this a real booking service?', answer: 'No. This is an interactive prototype. Nothing you enter is sent or saved, and caregivers, prices and reviews are fictional.' },
  { question: 'Where would my pet stay?', answer: 'Either at the caregiver’s home or at yours, depending on the option you choose and what the caregiver offers.' },
  { question: 'Will I see a caregiver’s exact address?', answer: 'Not publicly. Profiles show an approximate neighborhood, and the exact address would be shared only after a booking is confirmed.' },
  { question: 'What do I tell the caregiver about my pet?', answer: 'Food and allergies, medication, daily routine, behavior and emergency contacts, all in the request form before a stay begins.' },
  { question: 'Who checks the caregivers?', answer: 'Nobody yet. A real service would need identity checks, insurance and clear policies, and would only mark a check complete once it was done.' },
]

export const START_ACTIONS: StartAction[] = [
  { title: 'Find a caregiver', description: 'Browse sample profiles and filter by area, care type and pet size.', to: '/caregivers', icon: 'pin', tone: 'green' },
  { title: 'Request care', description: 'Pick dates and share your pet’s food, routine and emergency contact.', to: '/book', icon: 'heart', tone: 'blue' },
  { title: 'Become a caregiver', description: 'Try the application form for people who would host or visit pets.', to: '/become-a-caregiver', icon: 'paw', tone: 'orange' },
  { title: 'See a booking', description: 'Preview each status a request can move through, from requested to confirmed.', to: '/booking-status', icon: 'clock', tone: 'purple' },
]
