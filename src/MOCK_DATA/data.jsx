export let mock_data = [
  {
    id: '1',
    jobTitle: 'string',
    firstName: 'user 1',
    lastName: 'string',
    age: 'number',
    email: 'string',
    address: 'string',
    phoneNumber: '559-559-559',
    picturePath: '',
    location: 'location',
    gitHub: 'GIT HUB LINK',
    LinkedIn: 'LINKED IN LINK',

    jobExperience: [
      {
        compay: 'string',
        position: 'string',
        desc: 'string',
        workingDate: 'string',
      },
    ],
    education: [
      {
        school: 'string',
        degrre: 'string',
        desc: 'string',

        eduDate: 'string',
      },
    ],
  },
  {
    id: '2',
    jobTitle: 'string',
    firstName: 'user 2',
    lastName: 'string',
    age: 'number',
    email: 'string',
    address: 'string',
    phoneNumber: '559-559-559',
    picturePath: '',
    location: 'location',
    gitHub: 'GIT HUB LINK',
    LinkedIn: 'LINKED IN LINK',

    jobExperience: [
      {
        compay: 'string',
        position: 'string',
        desc: 'string',
        workingDate: 'string',
      },
    ],
    education: [
      {
        school: 'string',
        degrre: 'string',
        desc: 'string',

        eduDate: 'string',
      },
    ],
  },
  {
    id: '3',
    jobTitle: 'string',
    firstName: 'user 3',
    lastName: 'string',
    age: 'number',
    email: 'string',
    address: 'string',
    phoneNumber: '559-559-559',
    picturePath: '',
    location: 'location',
    gitHub: 'GIT HUB LINK',
    LinkedIn: 'LINKED IN LINK',

    jobExperience: [
      {
        compay: 'string',
        position: 'string',
        desc: 'string',
        workingDate: 'string',
      },
    ],
    education: [
      {
        school: 'string',
        degrre: 'string',
        desc: 'string',

        eduDate: 'string',
      },
    ],
  },
  {
    id: '4',
    jobTitle: 'string',
    firstName: 'user 4',
    lastName: 'string',
    age: 'number',
    email: 'string',
    address: 'string',
    phoneNumber: '559-559-559',
    picturePath: '',
    location: 'location',
    gitHub: 'GIT HUB LINK',
    LinkedIn: 'LINKED IN LINK',

    jobExperience: [
      {
        compay: 'string',
        position: 'string',
        desc: 'string',
        workingDate: 'string',
      },
    ],
    education: [
      {
        school: 'string',
        degrre: 'string',
        desc: 'string',

        eduDate: 'string',
      },
    ],
  },
]

// const UserSchema = new mongoose.Schema(
//   {
//     jobTitle: {
//       type: String,
//       Required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//       min: 2,
//       max: 50,
//     },
//     lastName: {
//       type: String,
//       required: true,
//       min: 2,
//       max: 50,
//     },
//     email: {
//       type: String,
//       required: true,
//       max: 50,
//       unique: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//       min: 5,
//     },
//     picturePath: {
//       type: String,
//       default: "",
//     },
//     age: {
//       required: true,
//       type: Number,
//     },
//     location: {
//       required: true,
//       type: String,
//     },
//     gitHub: {
//       required: true,
//       type: String,
//     },
//     LinkedIn: {
//       required: true,
//       type: String,
//     },
//     jobExperience: {
//       type: {
//         company: {
//           type: String,
//           required: true,
//         },
//         jobTitle: {
//           type: String,
//           required: true,
//         },
//         date: {
//           type: String,
//           required: true,
//         },
//         desc: {
//           type: String,
//           required: true,
//         },
//       },
//     },
//     education: {
//       type: {
//         university: {
//           type: String,
//           required: true,
//         },
//         degree: {
//           type: String,
//           required: true,
//         },
//         date: {
//           type: String,
//           required: true,
//         },
//         desc: {
//           type: String,
//           required: true,
//         },
//       },
//       FrameWorks:{
//         type:[String]
//       }

//     },
//   },

const fake = [
  {
    _id: '64be1e5f8548b106b9ee7bd4',
    jobTitle: 'fullStack Developer',
    firstName: 'akaki',
    lastName: 'gumberidze',
    email: 'akaki7600@gmail.com',
    phoneNumber: '599112940',
    picturePath: '',
    age: 25,
    location: 'tbilisi',
    gitHub: 'github.com/fireFsitDev',
    linkedIn: 'linkedIn.com',
    jobExperience: [
      {
        company: 'betMavrik',
        position: 'fullStack',
        date: '2020-09-01- today',
        desc: 'build casino websites',
      },
    ],
    education: [
      {
        school: 'iliauni',
        degree: 'magister',
        date: '2016-09-01- 2020-09-01',
        desc: 'law mgister ',
      },
    ],
    technologies: [
      'javascript',
      'TypeScript',
      'React',
      'Node',
      'MongoDB',
      'MySQL',
    ],
  },
]

export class Job {
  constructor(company, position, date, description) {
    this.company = company
    this.position = position
    this.date = date
    this.description = description
  }
}

export const newMockData = [
  {
    _id: '64c08f88f982a37414ba2246',
    owner: '64c08ed5f982a37414ba2244',
    jobTitle: 'full-stack develiper',
    firstName: 'lasha',
    lastName: 'ramishvili',
    email: 'lasha22@gmail.com',
    phoneNumber: '+995 599 111111',
    picturePath:
      'https://firebasestorage.googleapis.com/v0/b/img-upload-7d368.appspot.com/o/forum%2Fphoto-1633332755192-727a05c4013d.jpg?alt=media&token=a84095f5-afb2-42f1-b24f-bcd795719463',
    age: 20,
    location: 'Georgia',
    gitHub: 'github.com',
    linkedIn: 'linkedin.com',
    jobExperience: [
      {
        company: 'google',
        position: 'senior developer',
        date: '2020-2022',
        desc: 'working on google',
      },
    ],
    education: [],
    technologies: ['react', 'node ', 'java'],
    __v: 0,
  },
  {
    _id: '64c01e427db9f806af65b680',
    owner: '64c01649e962f4351c201f11',
    jobTitle: 'Web-Developer',
    firstName: 'John',
    lastName: 'Cena',
    email: 'john@gmail.com',
    phoneNumber: '559323232',
    picturePath:
      'https://firebasestorage.googleapis.com/v0/b/img-upload-7d368.appspot.com/o/forum%2Fphoto-1633332755192-727a05c4013d.jpg?alt=media&token=a84095f5-afb2-42f1-b24f-bcd795719463',
    age: 31,
    location: 'Georgia',
    gitHub: 'https://github.com/vindexTOS',
    linkedIn: 'https://www.linkedin.com/in/giorgi-kutateladze-65a83919a/',
    jobExperience: [
      {
        company: 'Cisco',
        position: 'Dev-ops',
        date: '2021-2022',
        desc:
          'Research and resolve network issues. Locate, install, and configure routers and switches, and network hardware. Install and configure firewalls and other network security devices. Develop network diagrams, schematics, and flow charts.',
      },
      {
        company: 'Cisco',
        position: 'Dev-ops',
        date: '2021-2022',
        desc:
          'Research and resolve network issues. Locate, install, and configure routers and switches, and network hardware. Install and configure firewalls and other network security devices. Develop network diagrams, schematics, and flow charts.',
      },
    ],
    education: [
      {
        school: 'University of Michigan',
        degree: 'Math',
        date: '2021-2022',
        desc:
          'Research and resolve network issues. Locate, install, and configure routers and switches, and network hardware. Install and configure firewalls and other network security devices. Develop network diagrams, schematics, and flow charts.',
      },
    ],
    technologies: [
      'TypeScript',
      'React',
      'Javascript',
      'Python',
      'Php',
      'MySql',
      'MongoDB',
      'Css',
      'Html',
    ],
    __v: 0,
  },
]
