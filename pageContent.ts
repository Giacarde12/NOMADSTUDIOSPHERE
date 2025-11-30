export interface PageContent {
  title: string;
  subtitle: string;
  description: string;
  images: string[];
}

export const PAGE_CONTENTS: Record<string, PageContent> = {
  Manifesto: {
    title: 'Manifesto',
    subtitle: 'Our Philosophy',
    description: 'We believe in returning to our roots. In the gesture that precedes words, in the gaze that meets the raw matter even before it\'s named. We call something RAW when it\'s still unfiltered, untamed, unlabelled. What is RAW defies definitions — it\'s the sacred source of every intuition. Our approach is primaeval, not archaic: it\'s an intuitive, direct sensorial means of perception that brings body and imagination at the heart of the creative process. Nomad Studio Publishing was created to explore all that\'s raw, unpolished, alive. A laboratory in a state of flow where publishing, art, mapping and installation influence each other to tell the fundamental relationship between humankind, nature and landscape.',
    images: [
      'https://static.wixstatic.com/media/2e0b3c_026b05a4bc914a34a3f2409f9ea128a8~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_ff04d880d45c434a8a522e0962676d29~mv2.png',
      'https://static.wixstatic.com/media/2e0b3c_cf024aa494f94c948f2415b1dad3431e~mv2.jpg',
    ]
  },
  'Creative & Editorial Services': {
    title: 'Creative & Editorial Services',
    subtitle: 'Design, consulting, and content curations',
    description: 'Nomad Studio offers comprehensive creative and editorial services tailored to cultural institutions, publishers, and brands seeking authentic storytelling. We provide design consulting, content curation, and strategic editorial direction that integrates visual language with conceptual depth. Our approach combines artistic vision with practical expertise to develop compelling narratives across multiple media platforms.',
    images: [
      'https://static.wixstatic.com/media/2e0b3c_653cc1cbaf964afbb6d59c456e6feb23~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_2ab2a8d61f69482ebb8086eceeec4c2b~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_6483d95024cb42a1aab19295effd86d9~mv2.jpg',
    ]
  },
  Workshops: {
    title: 'Workshops',
    subtitle: 'Hands-on creative and editorial labs',
    description: 'Through intensive workshops and creative labs, we facilitate hands-on exploration of publishing, design, and sensory practice. These sessions bring together participants to engage directly with materials, ideas, and processes, fostering experiential learning and collaborative creativity. We design workshops that activate imagination and challenge conventional approaches to content creation and visual communication.',
    images: [
      'https://static.wixstatic.com/media/2e0b3c_9c6fb755e05a42d59bace16ce99a0d73~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_1f4ae188119148c69ae602a615c72205~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_026b05a4bc914a34a3f2409f9ea128a8~mv2.jpg',
    ]
  },
  'Raw Pantelleria': {
    title: 'Raw Pantelleria',
    subtitle: 'Residency & Retreat',
    description: 'Raw Pantelleria is a residency program and creative retreat rooted in the Mediterranean island\'s volcanic landscape. It brings together artists, researchers, and thinkers to explore the raw essence of place through immersive experiences, collaborative practices, and sensorial engagement with territory.',
    images: [
      'https://static.wixstatic.com/media/2e0b3c_ff04d880d45c434a8a522e0962676d29~mv2.png',
      'https://static.wixstatic.com/media/2e0b3c_cf024aa494f94c948f2415b1dad3431e~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_2ab2a8d61f69482ebb8086eceeec4c2b~mv2.jpg',
    ]
  },
  'Educational Programs': {
    title: 'Educational Programs',
    subtitle: 'Collaborations with schools and universities',
    description: 'We develop collaborative educational initiatives with schools and universities that integrate artistic practice into academic curricula. Our programs foster critical engagement with contemporary visual culture, territorial studies, and sensory-based learning methodologies. We believe in education as a transformative practice that connects theoretical knowledge with embodied experience.',
    images: [
      'https://static.wixstatic.com/media/2e0b3c_653cc1cbaf964afbb6d59c456e6feb23~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_9c6fb755e05a42d59bace16ce99a0d73~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_1f4ae188119148c69ae602a615c72205~mv2.jpg',
    ]
  },
  'Publishing & Product Sales': {
    title: 'Publishing & Product Sales',
    subtitle: 'Limited editions, zines, and art objects',
    description: 'Nomad Studio Publishing produces limited edition publications, artist zines, and curated art objects that embody our philosophy of raw, unpolished creativity. Each publication is conceived as a tactile experience, combining exceptional design with thoughtful content. We create objects that serve as vessels for ideas, designed to be held, contemplated, and shared.',
    images: [
      'https://static.wixstatic.com/media/2e0b3c_2ab2a8d61f69482ebb8086eceeec4c2b~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_653cc1cbaf964afbb6d59c456e6feb23~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_6483d95024cb42a1aab19295effd86d9~mv2.jpg',
    ]
  },
  'Artist & Research Residencies': {
    title: 'Artist & Research Residencies',
    subtitle: 'Temporary labs for publishing experimentation',
    description: 'Our artist and research residencies provide temporary spaces for intensive experimentation in publishing, visual research, and creative practice. These labs facilitate deep exploration of new methodologies, materials, and concepts, supporting artists and researchers in developing innovative approaches to contemporary publishing and visual communication. We offer dedicated time, resources, and community for transformative creative work.',
    images: [
      'https://static.wixstatic.com/media/2e0b3c_026b05a4bc914a34a3f2409f9ea128a8~mv2.jpg',
      'https://static.wixstatic.com/media/2e0b3c_ff04d880d45c434a8a522e0962676d29~mv2.png',
      'https://static.wixstatic.com/media/2e0b3c_cf024aa494f94c948f2415b1dad3431e~mv2.jpg',
    ]
  }
};
