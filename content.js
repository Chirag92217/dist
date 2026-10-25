// EDIT HERE: add projects by copying an object. Optional image and link fields are supported.
window.portfolio = {
  photo: 'assets/portrait.webp',
  gallery: [
  {
    "src": "assets/moments/moment-01.webp",
    "caption": "Mountain evenings",
    "alt": "A mountain valley and riverside buildings under a pink evening sky"
  },
  {
    "src": "assets/moments/moment-02.webp",
    "caption": "Above the valley",
    "alt": "Chirag looking out over a green mountain valley"
  },
  {
    "src": "assets/moments/moment-03.webp",
    "caption": "Green ridgelines",
    "alt": "Green mountain ridges under a cloudy sky"
  },
  {
    "src": "assets/moments/moment-04.webp",
    "caption": "Roadside stops",
    "alt": "Mountain road signs and colourful flags"
  },
  {
    "src": "assets/moments/moment-05.webp",
    "caption": "Colourful streets",
    "alt": "A street with colourful flags and painted shopfronts"
  },
  {
    "src": "assets/moments/moment-07.webp",
    "caption": "Mountain views",
    "alt": "Layered mountain ridges with a settlement in the valley"
  },
  {
    "src": "assets/moments/moment-09.webp",
    "caption": "A stop in Chitkul",
    "alt": "Chirag standing by the Chitkul village sign"
  }
],
  skillGroups: [
    {name:'Languages', items:['Python', 'C / C++', 'SQL', 'HTML / CSS']},
    {name:'Frameworks', items:['PyTorch', 'TensorFlow', 'FastAPI']},
    {name:'Deep learning', items:['CNNs', 'Transformers', 'Computer vision architectures']},
    {name:'Developer tools', items:['Git', 'Docker', 'VS Code', 'PyCharm']},
    {name:'Libraries', items:['Pandas', 'NumPy', 'Matplotlib', 'OpenCV', 'Open3D']}
  ],
  skills: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'FastAPI', 'SQL', 'Docker', 'Git', 'NumPy', 'Open3D'],
  projects: [
    {title:'Teaching machines to read movement.', name:'Dynamic Hand Gesture Recognition', category:'COMPUTER VISION / MULTIMODAL LEARNING', slug:'gesture-recognition', type:'gesture', tags:['RGB + Depth','CNN–LSTM','Real-time inference'], summary:'Recognising hand gestures using RGB and depth data, including in low light.', description:'A multimodal deep learning system combining RGB and depth data from stereo cameras for dynamic hand gesture recognition in low-light environments.', approach:'A CNN–LSTM architecture models spatial features and temporal motion. Depth sensing provides additional information when illumination varies.', contribution:'Developed the multimodal system and implemented a real-time inference pipeline for live gesture recognition.', image:'assets/gesture-cover.webp', link:''},
    {title:'From seeing a part to understanding it.', name:'Drone Assistant', category:'COMPUTER VISION / RETRIEVAL-AUGMENTED GENERATION', slug:'drone-assistant', type:'drone', tags:['YOLO','NLP','RAG'], summary:'Detecting drone parts from images and answering questions about them.', description:'A two-phase intelligent system combining computer vision and natural language processing to identify and query drone components.', approach:'A fine-tuned YOLO-based model detects and classifies components in images and video. A retrieval-augmented generation pipeline supports interactive questions about detected parts.', contribution:'Designed the two-phase system, fine-tuned the detector, and built the RAG pipeline.', image:'assets/drone-cover.webp', link:''}
  ]
};
