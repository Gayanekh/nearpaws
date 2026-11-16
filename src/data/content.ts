// All illustrative content lives here. Everything below is fictional sample data.
// Change BRAND or any caregiver and the whole prototype updates.
import type { Caregiver } from '../types'

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
    review: { quote: 'Sample review: A real home, not a kennel. We were so relieved.', author: 'Illustrative owner' },
  },
]
