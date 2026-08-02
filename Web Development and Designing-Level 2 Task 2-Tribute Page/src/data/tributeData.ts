import { TributeFigure } from '../types';

import kalamImg from '../assets/images/kalam_tribute_portrait_1785640846390.jpg';
import ramanujanImg from '../assets/images/ramanujan_portrait_1785641903693.jpg';
import sarabhaiImg from '../assets/images/sarabhai_portrait_1785641918655.jpg';

export const TRIBUTE_FIGURES: TributeFigure[] = [
  {
    id: 'apj-abdul-kalam',
    name: 'Dr. A. P. J. Abdul Kalam',
    shortName: 'Dr. Kalam',
    tagline: 'The Missile Man of India, 11th President, & Catalyst of Youth Empowerment',
    era: '1931 – 2015',
    bornDied: 'October 15, 1931 – July 27, 2015',
    birthplace: 'Rameswaram, Tamil Nadu, India',
    primaryField: 'Aerospace Engineering & Defense Technology',
    heroImage: kalamImg,
    imageCaption: 'Artistic portrait of Dr. A. P. J. Abdul Kalam against the backdrop of space exploration and rocket technology.',
    imageSource: 'Wikimedia Commons & Public Archives (Paraphrased Research)',
    quickStats: [
      { label: 'Role', value: '11th President of India' },
      { label: 'Key Award', value: 'Bharat Ratna (1997)' },
      { label: 'Key Innovation', value: 'SLV-III & Agni Missile' },
      { label: 'Books Authored', value: 'Wings of Fire, Ignited Minds' },
      { label: 'Beloved Title', value: "People's President" }
    ],
    biographyParagraphs: [
      {
        heading: 'I. Humble Origins in Rameswaram',
        content: 'Avul Pakir Jainulabdeen Abdul Kalam was born on October 15, 1931, in the island town of Rameswaram, Tamil Nadu. Raised in a modest boat-owner family, Kalam learned the values of dedication, humility, and interfaith harmony from an early age. To support his family and fund his schooling, he distributed newspapers as a young boy, demonstrating a relentless work ethic that would characterize his entire lifetime. His early fascination with flight, observed while watching sea birds soar over the Pamban Strait, fueled his ambition to study aeronautical science.'
      },
      {
        heading: 'II. Architectural Breakthroughs in Space & Defense Technology',
        content: 'After graduating in Aeronautical Engineering from the Madras Institute of Technology (MIT) in 1960, Kalam joined the Defence Research and Development Organisation (DRDO) and later transferred to the Indian Space Research Organisation (ISRO). As Project Director for India’s first indigenous Satellite Launch Vehicle (SLV-III), he successfully led the mission that deployed the Rohini satellite into orbit in July 1980. Returning to DRDO, Kalam directed the Integrated Guided Missile Development Programme (IGMDP), architecting legendary missile systems including Agni and Prithvi, earned him the venerated moniker "Missile Man of India."'
      },
      {
        heading: 'III. Pokhran-II & National Defense Strategy',
        content: 'During the late 1990s, Kalam served as the Chief Scientific Adviser to the Prime Minister and Secretary of DRDO. He played a pivotal technical and organizational role in the Pokhran-II nuclear tests of May 1998, establishing India’s strategic deterrence capability. Beyond weapon design, Kalam advocated fervently for technology transfer to benefit civilian health—co-developing the low-cost "Kalam-Raju Stent" for coronary heart disease and lightweight carbon-fiber callipers for polio-affected children, bringing aerospace innovation directly to medical care.'
      },
      {
        heading: 'IV. The People’s Presidency & Unwavering Dedication to Youth',
        content: 'In 2002, Kalam was elected as the 11th President of India with overwhelming cross-party support. Instantly dubbed the "People\'s President," he opened the Rashtrapati Bhavan to students, innovators, and everyday citizens. During and after his presidency, Kalam set an extraordinary personal goal: interacting personally with over 10 million students across India. He believed that the youth possessed the boundless energy and creative vision necessary to transform India into a developed nation by 2020 through scientific education, ethical governance, and rural development (PURA initiative).'
      },
      {
        heading: 'V. Enduring Legacy & Eternal Inspiration',
        content: 'Dr. Kalam collapsed while delivering a lecture on "Creating a Liveable Planet Earth" to students at IIM Shillong on July 27, 2015. True to his lifelong passion, he passed away while teaching. Honored with India’s highest civilian awards—including the Padma Bhushan (1981), Padma Vibhushan (1990), and Bharat Ratna (1997)—his legacy continues to ignite young minds worldwide. His life remains an enduring testament to how humility, scientific rigor, and selfless public service can elevate a nation.'
      }
    ],
    timeline: [
      {
        id: 'k1',
        year: '1931',
        title: 'Born in Rameswaram',
        description: 'Born into a Tamil Muslim family in Rameswaram, Tamil Nadu.',
        category: 'Early Life',
        location: 'Rameswaram, India',
        impactScore: 7
      },
      {
        id: 'k2',
        year: '1960',
        title: 'Graduated in Aeronautical Engineering',
        description: 'Completed degree from Madras Institute of Technology (MIT) and joined DRDO as a scientist.',
        category: 'Breakthrough',
        location: 'Chennai, India',
        impactScore: 8
      },
      {
        id: 'k3',
        year: '1969',
        title: 'Transferred to ISRO & SLV-III Project',
        description: 'Appointed Project Director for India’s first Satellite Launch Vehicle (SLV-III).',
        category: 'Breakthrough',
        location: 'Sriharikota, India',
        impactScore: 9
      },
      {
        id: 'k4',
        year: '1980',
        title: 'Successful Launch of Rohini Satellite',
        description: 'Rohini-1 satellite placed into orbit, placing India in an elite space-faring nation club.',
        category: 'Breakthrough',
        location: 'ISRO, India',
        impactScore: 10
      },
      {
        id: 'k5',
        year: '1982 - 1998',
        title: 'Guided Missile Program & Pokhran-II',
        description: 'Directed DRDO’s IGMDP creating Agni and Prithvi missiles; chief scientific advisor for Pokhran-II tests in 1998.',
        category: 'Leadership & Service',
        location: 'Pokhran & DRDO',
        impactScore: 10
      },
      {
        id: 'k6',
        year: '1997',
        title: 'Awarded Bharat Ratna',
        description: 'Conferred India’s highest civilian honor for contributions to scientific research and defense modernization.',
        category: 'Awards & Honors',
        location: 'New Delhi',
        impactScore: 10
      },
      {
        id: 'k7',
        year: '2002 - 2007',
        title: 'Sworn in as 11th President of India',
        description: 'Served as President with distinction, championing education, technology, and youth interaction.',
        category: 'Leadership & Service',
        location: 'Rashtrapati Bhavan, New Delhi',
        impactScore: 10
      },
      {
        id: 'k8',
        year: '2015',
        title: 'Final Lecture & Legacy',
        description: 'Passed away on July 27 while lecturing at IIM Shillong; remembered globally on World Students’ Day (Oct 15).',
        category: 'Legacy',
        location: 'Shillong, Meghalaya',
        impactScore: 10
      }
    ],
    featuredQuote: {
      id: 'q-kalam-1',
      text: 'Dream is not that which you see while sleeping; it is something that does not let you sleep.',
      context: 'From his inspirational address to students on passion and determination',
      year: '1999',
      theme: 'Inspiration'
    },
    quoteArchive: [
      {
        id: 'q-kalam-1',
        text: 'Dream is not that which you see while sleeping; it is something that does not let you sleep.',
        context: 'Wings of Fire',
        year: '1999'
      },
      {
        id: 'q-kalam-2',
        text: 'If you fail, never give up because F.A.I.L. means "First Attempt In Learning".',
        context: 'Keynote speech to young scientists',
        year: '2006'
      },
      {
        id: 'q-kalam-3',
        text: 'Excellence happens not by accident. It is a process.',
        context: 'Ignited Minds',
        year: '2002'
      },
      {
        id: 'q-kalam-4',
        text: 'To succeed in your mission, you must have single-minded devotion to your goal.',
        context: 'Address at Anna University',
        year: '2004'
      }
    ],
    quiz: [
      {
        id: 'qz-k1',
        question: 'Which satellite launch vehicle did Dr. Kalam direct to deploy the Rohini satellite in 1980?',
        options: ['PSLV-C11', 'SLV-III', 'GSLV Mk III', 'Aryabhata-1'],
        correctIndex: 1,
        explanation: 'Dr. Kalam was the Project Director for SLV-III, India’s first indigenous satellite launch vehicle.'
      },
      {
        id: 'qz-k2',
        question: 'What is the acronym F.A.I.L. famously defined as by Dr. Kalam?',
        options: ['Final Action In Life', 'First Attempt In Learning', 'Future Aim In Leadership', 'Fundamental Analysis In Logic'],
        correctIndex: 1,
        explanation: 'Dr. Kalam encouraged students by reminding them that F.A.I.L. stands for "First Attempt In Learning".'
      },
      {
        id: 'qz-k3',
        question: 'In which year was Dr. Kalam awarded the Bharat Ratna, India’s highest civilian honor?',
        options: ['1981', '1990', '1997', '2002'],
        correctIndex: 2,
        explanation: 'Dr. Kalam received the Bharat Ratna in 1997 for his exceptional service to defense and space research.'
      },
      {
        id: 'qz-k4',
        question: 'Which medical innovation did Dr. Kalam co-develop for cardiac patients?',
        options: ['Kalam-Raju Stent', 'Titanium Pacemaker', 'Prithvi Ventricle', 'Agni Catheter'],
        correctIndex: 0,
        explanation: 'Alongside Dr. Soma Raju, Dr. Kalam developed the low-cost coronary stent known as the Kalam-Raju Stent.'
      },
      {
        id: 'qz-k5',
        question: 'What was Dr. Kalam doing when he delivered his final moments on July 27, 2015?',
        options: ['Testing a rocket prototype', 'Writing an autobiography chapter', 'Lecturing students at IIM Shillong', 'Attending an international summit'],
        correctIndex: 2,
        explanation: 'True to his lifelong mission, Dr. Kalam collapsed while delivering a lecture to students at IIM Shillong.'
      }
    ],
    references: [
      { title: 'Dr. A.P.J. Abdul Kalam - Wikipedia Article', type: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/A._P._J._Abdul_Kalam' },
      { title: 'Encyclopædia Britannica Biography', type: 'Britannica', url: 'https://www.britannica.com/biography/A-P-J-Abdul-Kalam' },
      { title: 'Wikimedia Commons Media Archives', type: 'Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/Category:A._P._J._Abdul_Kalam' }
    ],
    defaultBgTheme: {
      heroBg: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
      bioBg: 'bg-[#FAF8F5]',
      bioTextColor: 'text-stone-900',
      timelineBg: 'bg-[#0B132B]',
      quoteBg: 'bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80',
      accentColor: 'amber-500'
    }
  },
  {
    id: 'srinivasa-ramanujan',
    name: 'Srinivasa Ramanujan',
    shortName: 'S. Ramanujan',
    tagline: 'Self-Taught Mathematical Genius & Master of Infinite Series & Number Theory',
    era: '1887 – 1920',
    bornDied: 'December 22, 1887 – April 26, 1920',
    birthplace: 'Erode, Tamil Nadu, India',
    primaryField: 'Mathematics, Number Theory & Infinite Series',
    heroImage: ramanujanImg,
    imageCaption: 'Artistic portrait of Srinivasa Ramanujan surrounded by mathematical formulas and infinite series reflecting his transcendent genius.',
    imageSource: 'Wikimedia Commons & Trinity College Archives',
    quickStats: [
      { label: 'Role', value: 'Mathematical Prodigy & FRS' },
      { label: 'Key Discovery', value: 'Ramanujan Prime & Theta Functions' },
      { label: 'Hardy-Ramanujan No.', value: '1729 (Taxi Cab Number)' },
      { label: 'National Day', value: 'National Mathematics Day (Dec 22)' },
      { label: 'Key Partner', value: 'G. H. Hardy (Cambridge)' }
    ],
    biographyParagraphs: [
      {
        heading: 'I. Humble Beginnings & Mathematical Awakening',
        content: 'Srinivasa Ramanujan was born on December 22, 1887, in Erode, Tamil Nadu, to a modest Brahmin family. Growing up in Kumbakonam, his extraordinary numerical intuition manifested early: by age eleven, he had exhausted the mathematical knowledge of college students lodging at his home. At sixteen, obtaining a copy of G. S. Carr’s "A Synopsis of Elementary Results in Pure and Applied Mathematics," Ramanujan systematically proved thousands of complex theorems on his own, filling his iconic leather-bound notebooks with groundbreaking mathematical insights without formal guidance.'
      },
      {
        heading: 'II. The Madras Port Trust & Historic Letter to Cambridge',
        content: 'Lacking formal credentials and having lost college scholarships due to his exclusive focus on mathematics to the neglect of other subjects, Ramanujan worked as a clerk at the Madras Port Trust. Recognizing his unparalleled genius, Indian scholars urged him to write to prominent Western mathematicians. In January 1913, Ramanujan dispatched a historic letter containing nearly 120 mathematical theorems to G. H. Hardy, Cayley Lecturer in Mathematics at Cambridge University. Hardy initially suspected a hoax, but quickly realized the work could only be written by a mathematician of the highest class.'
      },
      {
        heading: 'III. Cambridge Collaboration & Infinite Series',
        content: 'Arriving at Trinity College, Cambridge in April 1914, Ramanujan began an unprecedented intellectual partnership with G. H. Hardy and J. E. Littlewood. Despite cultural adjustments and WWII food shortages, Ramanujan produced brilliant original research on partition functions, mock theta functions, continued fractions, and modular forms. His formula for calculating pi using rapidly converging infinite series revolutionized computational mathematics decades before the advent of digital supercomputers.'
      },
      {
        heading: 'IV. The Legend of 1729 & Royal Society Fellowship',
        content: 'In 1918, Ramanujan became one of the youngest Fellows of the Royal Society (FRS) and the first Indian elected a Fellow of Trinity College, Cambridge. When Hardy visited Ramanujan in a Putney hospital, mentioning he arrived in taxi cab number 1729 which seemed rather dull, Ramanujan instantly replied: "No, Hardy, it is a very interesting number! It is the smallest number expressible as the sum of two cubes in two different ways (1³ + 12³ and 9³ + 10³)." Today, 1729 is celebrated globally as the Hardy-Ramanujan Number.'
      },
      {
        heading: 'V. Tragic Passing & Immortal Mathematical Legacy',
        content: 'Plagued by severe illness and malnutrition, Ramanujan returned to India in 1919 and passed away on April 26, 1920, at the age of thirty-two. On his deathbed, he produced his "lost notebook," filled with deep insights into mock theta functions that continue to unlock breakthroughs in modern string theory and quantum physics. In 2012, India officially declared his birthday, December 22, as National Mathematics Day, honoring a soul who saw divine beauty in the language of numbers.'
      }
    ],
    timeline: [
      {
        id: 'r1',
        year: '1887',
        title: 'Born in Erode, Tamil Nadu',
        description: 'Born to K. Srinivasa Aiyangar and Komalatammal in Erode.',
        category: 'Early Life',
        location: 'Erode, Tamil Nadu',
        impactScore: 6
      },
      {
        id: 'r2',
        year: '1903',
        title: 'Mastery of Carr’s Mathematics Synopsis',
        description: 'Discovered Carr’s textbook and independently derived thousands of advanced theorems.',
        category: 'Breakthrough',
        location: 'Kumbakonam, India',
        impactScore: 8
      },
      {
        id: 'r3',
        year: '1911',
        title: 'First Journal Publication',
        description: 'Published first research paper on Bernoulli numbers in Journal of Indian Mathematical Society.',
        category: 'Breakthrough',
        location: 'Chennai, India',
        impactScore: 8
      },
      {
        id: 'r4',
        year: '1913',
        title: 'Historic Letter to G. H. Hardy',
        description: 'Sent 120 theorems to Hardy at Cambridge, prompting an invitation to England.',
        category: 'Breakthrough',
        location: 'Madras to Cambridge',
        impactScore: 10
      },
      {
        id: 'r5',
        year: '1914',
        title: 'Arrival at Trinity College, Cambridge',
        description: 'Began iconic collaboration with Hardy and Littlewood at Cambridge University.',
        category: 'Leadership & Service',
        location: 'Cambridge, UK',
        impactScore: 10
      },
      {
        id: 'r6',
        year: '1918',
        title: 'Elected Fellow of the Royal Society (FRS)',
        description: 'Became the second Indian FRS and Fellow of Trinity College for groundbreaking number theory.',
        category: 'Awards & Honors',
        location: 'London & Cambridge',
        impactScore: 10
      },
      {
        id: 'r7',
        year: '1919',
        title: 'Discovery of 1729 & Return to India',
        description: 'Formulated Hardy-Ramanujan number concept and returned to India due to declining health.',
        category: 'Breakthrough',
        location: 'London & Chennai',
        impactScore: 9
      },
      {
        id: 'r8',
        year: '1920',
        title: 'Passing & Lost Notebook Legacy',
        description: 'Passed away at age 32; left behind the "Lost Notebook" that inspires string theory today.',
        category: 'Legacy',
        location: 'Chetpet, Chennai',
        impactScore: 10
      }
    ],
    featuredQuote: {
      id: 'q-ramanujan-1',
      text: 'An equation for me has no meaning, unless it expresses a thought of God.',
      context: 'His personal philosophy linking mathematical beauty to divine order',
      year: '1916',
      theme: 'Mathematics & Divine Order'
    },
    quoteArchive: [
      {
        id: 'q-ramanujan-1',
        text: 'An equation for me has no meaning, unless it expresses a thought of God.',
        context: 'Reflections with G. H. Hardy',
        year: '1916'
      },
      {
        id: 'q-ramanujan-2',
        text: 'While asleep, I had a remarkable experience... a screen of red blood opened before my eyes and mathematical equations appeared.',
        context: 'Describing his intuitive flashes of genius',
        year: '1915'
      },
      {
        id: 'q-ramanujan-3',
        text: '1729 is a very interesting number; it is the smallest number expressible as the sum of two cubes in two different ways.',
        context: 'Hardy-Ramanujan Hospital Conversation',
        year: '1918'
      },
      {
        id: 'q-ramanujan-4',
        text: 'To be a mathematician is to see what everyone else sees, but think what no one else has thought.',
        context: 'Notebook Annotations',
        year: '1912'
      }
    ],
    quiz: [
      {
        id: 'qz-r1',
        question: 'What is the famous Hardy-Ramanujan number known for being the smallest sum of two cubes in two different ways?',
        options: ['108', '1729', '3141', '2026'],
        correctIndex: 1,
        explanation: '1729 equals 1³ + 12³ and 9³ + 10³, famously identified by Ramanujan during Hardy’s visit.'
      },
      {
        id: 'qz-r2',
        question: 'Which Cambridge mathematician received Ramanujan’s historic 1913 letter containing 120 theorems?',
        options: ['Alan Turing', 'G. H. Hardy', 'Isaac Newton', 'Bertrand Russell'],
        correctIndex: 1,
        explanation: 'G. H. Hardy recognized Ramanujan’s raw genius and invited him to Cambridge University.'
      },
      {
        id: 'qz-r3',
        question: 'Which day is celebrated in India as National Mathematics Day in honor of Ramanujan’s birthday?',
        options: ['October 15', 'December 22', 'August 12', 'February 28'],
        correctIndex: 1,
        explanation: 'December 22 was officially designated as National Mathematics Day in 2012 by the Government of India.'
      },
      {
        id: 'qz-r4',
        question: 'What is the name of the notebook Ramanujan composed on his deathbed in 1919-1920 containing mock theta functions?',
        options: ['The Royal Code', 'The Lost Notebook', 'The Cambridge Papers', 'The Ramanujan Codex'],
        correctIndex: 1,
        explanation: 'The "Lost Notebook" contained groundbreaking discoveries that weren’t rediscovered until 1976.'
      },
      {
        id: 'qz-r5',
        question: 'Which prestigious British society elected Ramanujan as a Fellow in 1918, making him one of its youngest members?',
        options: ['Royal Astronomical Society', 'Royal Society of London', 'British Academy', 'London Mathematical Guild'],
        correctIndex: 1,
        explanation: 'Ramanujan was elected Fellow of the Royal Society (FRS) in 1918 for his pioneering work in mathematics.'
      }
    ],
    references: [
      { title: 'Srinivasa Ramanujan - Wikipedia Article', type: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Srinivasa_Ramanujan' },
      { title: 'Encyclopædia Britannica - Srinivasa Ramanujan', type: 'Britannica', url: 'https://www.britannica.com/biography/Srinivasa-Ramanujan' },
      { title: 'Trinity College Cambridge Archives', type: 'Official Archive', url: 'https://www.trin.cam.ac.uk/about/history/ramanujan/' }
    ],
    defaultBgTheme: {
      heroBg: 'bg-gradient-to-b from-stone-950 via-zinc-900 to-stone-950',
      bioBg: 'bg-[#0F1115]',
      bioTextColor: 'text-zinc-100',
      timelineBg: 'bg-[#0F1115]',
      quoteBg: 'bg-[#16191F]',
      accentColor: 'emerald-400'
    }
  },
  {
    id: 'vikram-sarabhai',
    name: 'Dr. Vikram Sarabhai',
    shortName: 'Dr. Sarabhai',
    tagline: 'Father of the Indian Space Programme, Founder of ISRO, & Visionary Industrialist',
    era: '1919 – 1971',
    bornDied: 'August 12, 1919 – December 30, 1971',
    birthplace: 'Ahmedabad, Gujarat, India',
    primaryField: 'Cosmic Ray Physics, Space Science & Institutional Development',
    heroImage: sarabhaiImg,
    imageCaption: 'Artistic portrait of Dr. Vikram Sarabhai against rockets, satellites, and the cosmic expanse of space exploration.',
    imageSource: 'ISRO Official Archives & Public Domain Sourced',
    quickStats: [
      { label: 'Role', value: 'Father of Indian Space Programme' },
      { label: 'Institution', value: 'Founder of ISRO & PRL' },
      { label: 'Key Honor', value: 'Padma Vibhushan (1972)' },
      { label: 'Pioneering Project', value: 'SITE (Satellite Instruction TV)' },
      { label: 'Co-Founder', value: 'IIM Ahmedabad (IIMA)' }
    ],
    biographyParagraphs: [
      {
        heading: 'I. A Visionary Mind in Ahmedabad',
        content: 'Vikram Ambalal Sarabhai was born on August 12, 1919, in Ahmedabad, Gujarat, into a prominent industrial family that actively supported India’s independence movement. From an early age, Vikram displayed intense scientific curiosity and an entrepreneurial spirit. After completing his early education at the experimental RETREAT school founded by his parents, Sarabhai traveled to England to study Natural Sciences at St John’s College, Cambridge University.'
      },
      {
        heading: 'II. Cambridge Physics & Cosmic Ray Research',
        content: 'World War II forced Sarabhai to return temporarily to India, where he conducted research on cosmic rays under Nobel Laureate Sir C. V. Raman at the Indian Institute of Science (IISc) in Bangalore. Returning to Cambridge after the war, Sarabhai earned his PhD in 1947 with a thesis titled "Cosmic Ray Investigations in Tropical Latitudes." Upon returning to newly independent India, he established the Physical Research Laboratory (PRL) in Ahmedabad at just 28 years of age, laying the cornerstone for advanced space research.'
      },
      {
        heading: 'III. Architect of ISRO & The Thumba Rocket Station',
        content: 'In 1962, Sarabhai persuaded the Indian government of the vital importance of space research for a developing country. He established INCOSPAR (Indian National Committee for Space Research), which evolved into the Indian Space Research Organisation (ISRO) in 1969. With characteristic ingenuity, Sarabhai set up India’s first sounding rocket launch station at Thumba near Thiruvananthapuram, Kerala—utilizing a local church building as an equatorial launch facility and transporting early rocket components on bicycles and bullock carts.'
      },
      {
        heading: 'IV. SITE Project & Television for Rural Transformation',
        content: 'Sarabhai firmly believed that space technology should directly solve society’s everyday problems. He conceptualized the Satellite Instructional Television Experiment (SITE) in collaboration with NASA. Executed in 1975-76, SITE used NASA’s ATS-6 satellite to broadcast educational programming on agriculture, health, and family planning directly to over 2,400 remote villages across six Indian states, demonstrating the power of satellite communications for national development.'
      },
      {
        heading: 'V. Polymath Legacy & National Gratitude',
        content: 'Beyond space science, Sarabhai was a visionary institution builder who co-founded the Indian Institute of Management Ahmedabad (IIMA), the Operations Research Group (ORG), and the Darpana Academy of Performing Arts alongside his wife Mrinalini Sarabhai. Following the sudden death of Homi Bhabha in 1966, Sarabhai also served as Chairman of the Atomic Energy Commission. Passing away unexpectedly on December 30, 1971, at age fifty-two, he was posthumously awarded the Padma Vibhushan. Today, ISRO’s Vikram Sarabhai Space Centre (VSSC) and the Chandrayaan-3 Vikram Lander honor his timeless vision.'
      }
    ],
    timeline: [
      {
        id: 's1',
        year: '1919',
        title: 'Born in Ahmedabad, Gujarat',
        description: 'Born to Ambalal Sarabhai and Sarla Devi into a renowned industrial family.',
        category: 'Early Life',
        location: 'Ahmedabad, India',
        impactScore: 6
      },
      {
        id: 's2',
        year: '1947',
        title: 'PhD at Cambridge & Foundation of PRL',
        description: 'Completed PhD on cosmic rays at Cambridge and established Physical Research Laboratory (PRL) in Ahmedabad.',
        category: 'Breakthrough',
        location: 'Cambridge & Ahmedabad',
        impactScore: 9
      },
      {
        id: 's3',
        year: '1962',
        title: 'Established INCOSPAR',
        description: 'Convinced Indian Govt to establish national space committee alongside Homi Bhabha.',
        category: 'Leadership & Service',
        location: 'New Delhi',
        impactScore: 10
      },
      {
        id: 's4',
        year: '1963',
        title: 'First Rocket Launch from Thumba',
        description: 'Launched India’s first Nike-Apache sounding rocket from Thumba, Kerala.',
        category: 'Breakthrough',
        location: 'TERLS, Thiruvananthapuram',
        impactScore: 10
      },
      {
        id: 's5',
        year: '1966',
        title: 'Appointed Chairman of Atomic Energy Commission',
        description: 'Assumed leadership of India’s nuclear and atomic research following Homi Bhabha’s demise.',
        category: 'Leadership & Service',
        location: 'BARC, Mumbai',
        impactScore: 9
      },
      {
        id: 's6',
        year: '1969',
        title: 'Official Founding of ISRO',
        description: 'Transformed INCOSPAR into ISRO, setting India on path to becoming a premier space power.',
        category: 'Leadership & Service',
        location: 'Bengaluru / ISRO',
        impactScore: 10
      },
      {
        id: 's7',
        year: '1971',
        title: 'Passing & Eternal Tribute',
        description: 'Passed away on Dec 30; remembered as Father of the Indian Space Programme.',
        category: 'Legacy',
        location: 'Kovalam, Kerala',
        impactScore: 10
      },
      {
        id: 's8',
        year: '1972',
        title: 'Padma Vibhushan Conferred Posthumously',
        description: 'Awarded India’s second-highest civilian honor in recognition of unparalleled nation-building.',
        category: 'Awards & Honors',
        location: 'New Delhi',
        impactScore: 10
      }
    ],
    featuredQuote: {
      id: 'q-sarabhai-1',
      text: 'There are some who question the relevance of space activities in a developing nation. To us, there is no ambiguity of purpose. We must be second to none in the application of advanced technologies to the real problems of man and society.',
      context: 'His defining declaration of purpose for India’s space programme',
      year: '1968',
      theme: 'Space Science & Purpose'
    },
    quoteArchive: [
      {
        id: 'q-sarabhai-1',
        text: 'There are some who question the relevance of space activities in a developing nation. To us, there is no ambiguity of purpose.',
        context: 'INCOSPAR Declaration',
        year: '1968'
      },
      {
        id: 'q-sarabhai-2',
        text: 'He who can listen to music in the midst of noise can achieve great things.',
        context: 'Address at IIM Ahmedabad',
        year: '1965'
      },
      {
        id: 'q-sarabhai-3',
        text: 'Leadership for development requires an ability to foresee the future and create institutions that can meet its demands.',
        context: 'Management Keynote',
        year: '1967'
      },
      {
        id: 'q-sarabhai-4',
        text: 'Failure is not when we fail to achieve our goals; it is when we lack the courage to set ambitious goals.',
        context: 'PRL Address',
        year: '1969'
      }
    ],
    quiz: [
      {
        id: 'qz-v1',
        question: 'Which premier space organization was officially founded under Dr. Vikram Sarabhai’s leadership in 1969?',
        options: ['DRDO', 'ISRO', 'NASA', 'BARC'],
        correctIndex: 1,
        explanation: 'Dr. Sarabhai founded ISRO (Indian Space Research Organisation) on August 15, 1969.'
      },
      {
        id: 'qz-v2',
        question: 'Where was India’s first equatorial rocket launch station (TERLS) established by Dr. Sarabhai in 1963?',
        options: ['Sriharikota', 'Thumba, Thiruvananthapuram', 'Pokhran', 'Wheeler Island'],
        correctIndex: 1,
        explanation: 'Thumba Equatorial Rocket Launching Station was set up in Kerala using a local church as an early workshop.'
      },
      {
        id: 'qz-v3',
        question: 'Which groundbreaking satellite project did Dr. Sarabhai conceptualize to bring educational TV to 2,400 Indian villages?',
        options: ['SITE (Satellite Instructional TV Experiment)', 'Aryabhata-1', 'INSAT-1A', 'Chandrayaan Program'],
        correctIndex: 0,
        explanation: 'SITE was executed in 1975-76, bringing educational satellite broadcasts to rural India.'
      },
      {
        id: 'qz-v4',
        question: 'Which top management institute in India was co-founded by Dr. Vikram Sarabhai in 1961?',
        options: ['IIM Calcutta', 'IIM Ahmedabad', 'IIM Bangalore', 'XLRI Jamshedpur'],
        correctIndex: 1,
        explanation: 'Dr. Sarabhai co-founded IIM Ahmedabad (IIMA) to build world-class management leadership in India.'
      },
      {
        id: 'qz-v5',
        question: 'Which lunar lander module from India’s historic Chandrayaan-3 mission was named in honor of Dr. Sarabhai?',
        options: ['Pragyan', 'Vikram', 'Dhruva', 'Aditya'],
        correctIndex: 1,
        explanation: 'The Chandrayaan-3 lunar lander was named "Vikram" in memory of Dr. Vikram Sarabhai.'
      }
    ],
    references: [
      { title: 'Dr. Vikram Sarabhai - Wikipedia Article', type: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Vikram_Sarabhai' },
      { title: 'ISRO Official Profile - Dr. Vikram A. Sarabhai', type: 'Official Archive', url: 'https://www.isro.gov.in/VikramSarabhai.html' },
      { title: 'Encyclopædia Britannica - Vikram Sarabhai', type: 'Britannica', url: 'https://www.britannica.com/biography/Vikram-Sarabhai' }
    ],
    defaultBgTheme: {
      heroBg: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
      bioBg: 'bg-[#0F1115]',
      bioTextColor: 'text-slate-100',
      timelineBg: 'bg-[#0F1115]',
      quoteBg: 'bg-[#16191F]',
      accentColor: 'cyan-400'
    }
  }
];
