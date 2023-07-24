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
