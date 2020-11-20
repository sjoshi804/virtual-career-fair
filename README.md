# Virtual Career Fair

## Endpoints

### Job
| Type | Endpoint | Description (optional)
|-------------------|------------------------------------------------------|-------------------------------|
| POST              | /company/:companyid/job                              |                               |
| GET/UPDATE/DELETE | /company/:companyid/job/:jobid                       | Get one job, Edit job         |
| GET               | /company/:companyid/job                              | Get all jobs                  |
| POST              | /company/:companyid/job/:jobid/apply/:applicantid    | Applicant applies to job |
| POST              | /company/:companyid/job/:jobid/withdraw/:applicantid | |

### Company
| Type | Endpoint | Description (optional)
|-------------------|--------------------------------------------|-------------------------------|
| GET/POST          | /company                                   | |
| GET/UPDATE/DELETE | /company/:companyid                        | |
| POST              | /company/:companyid/addRecruiter/:recruiterId | adds recruiter to company|
| GET               | /company/:companyid/recruiter              | get all recruiters for a given company |

### Career Fair
| Type | Endpoint | Description (optional)
|-------------------|---------------------------------------------------------|-------------------------------|
| GET/POST          |/careerfair                                              | |
| GET/UPDATE/DELETE |/careerfair/:careerfairid                                | |
| POST              | /careerfair/:careerfairid/registerApplicant/:applicantid| only register an applicant that already exists in the db|
| GET               | /careerfair/:careerfairid/company                       | |

### Booth
| Type | Endpoint | Description (optional)
|-------------------|---------------------------------------------------------|-------------------------------|
| POST              |/careerfair/:careerfairid/company |  creates the booth associated with a company  |
| GET/UPDATE/DELETE |/careerfair/:careerfairid/company/:companyid | returns all active booth information about recruiters, applicants, queue, jobs, list of chat tuples [time, userid, message] |
| POST              |/careerfair/:careerfairid/company/:companyid/addApplicantToQueue/:applicantid | |
| POST              |/careerfair/:careerfairid/company/:companyid/removeApplicantFromQueue/:applicantid | |
| POST              |/careerfair/:careerfairid/company/:companyid/startNextMeeting/ | get next applicant, add recruiter and applicant to meeting object, return link to the next meeting so frontend can start the call |
| POST              |/careerfair/:careerfairid/company/:companyid/addRecruiter/:recruiterid |  add recruiter to active recruiters in careerfair.both in db |
| POST              |/careerfair/:careerfairid/company/:companyid/leaveRecruiter/:recruiterid | remove recruiter to active recruiters in careerfair.both in db |

### Meeting Notes
| Type | Endpoint | Description (optional)
|-------------------|---------------------------------------------------------|-------------------------------|
| POST                   |/meetingNote ||
| GET                    |/meetingNote/company/:companyid                                                 | see all meeting notes |
| GET                    |/meetingNote/company/:companyid/applicant/:applicantid                          | |
| GET                    |/meetingNote/company/:companyid/careerfair/:careerfairid                        | |
| GET/UPDATE/DELETE |/meetingNote/company/:companyid/careerfair/:careerfairid/applicant/:applicantid | |

### User
| Type | Endpoint | Description (optional)
|-------------------|---------------------------------------------------------|-------------------------------|
| POST              | user/login          | If successful, returns 200 with a valid web token and user type |

### Applicant
| Type | Endpoint | Description (optional)
|-------------------|---------------------------------------------------------|-------------------------------|
| GET/POST          |/applicant          | |
| GET/UPDATE/DELETE |/applicant/:userid  | |

### Recruiter
| Type | Endpoint | Description (optional)
|-------------------|---------------------------------------------------------|-------------------------------|
| GET/POST          |/recruiter         | |
| GET/UPDATE/DELETE |/recruiter/:userid  | |

### Organizer
| Type | Endpoint | Description (optional)
|-------------------|---------------------------------------------------------|-------------------------------|
| GET/POST          |/organizer          | |
| GET/UPDATE/DELETE |/organizer/:userid  | |

### Resume
| Type | Endpoint | Description (optional)
|-------------------|---------------------------------------------------------|-------------------------------|
| GET/UPDATE/DELETE/POST | /resume/:applicantid | |
| GET | /resume/:applicantid/insights | Get insights from resume |

## Collections
- User (stores organizer, recruiter and applicant)
``` 
{
  fullName: string,
  emailId: string,
  password: string,
  userType: int (0 = applicant, 1 = recruiter, 2 = organizer),
  applicant/recruiter/organizer data: json
  // depending on user type:
  applicantData: {
      major: string,
      graduationYear: number,
      affiliatedSchool: string,
      bio: string
  }
  recruiterData: {
      company: string,
      jobTitle: string,
      yearsOfExperience: number
  }
  organizerData: {
      affiliatedOrganization: string
  }
}
```
- Company (will contain jobs inside it)
```
{
  name: string,
  industry: string,
  description: string,
  image: string (link to logo saved in s3 bucket),
  jobs: [{
            title: string,
            description: string,
            prefferedMajors: list of strings
            applicants: list of strings (ids)
            isOpen: boolean
          },
          ...],
   recruiters: list of strings (ids)
} 
```
- Career Fair
```
{
  name: string,
  organizer: string (id),
  date: Date,
  startTime: Date,
  endTime: Date,
  applicants: list of strings (ids),
  announcements: list of strings
  booths: [{
                company: string (id)
                recruiters: list of strings (active recruiter ids),
                announcements: list of strings
             },
             ...]
}
```
- Meeting Notes
```
{
  applicant: string (id),
  careerfair: string (id),
  recruiter: string (id),
  company: string (id),
  notes: string
}
```
- Resume
```
{
  applicant: string (id),
  experiences: [{
                  startDate: Date,
                  endDate: Date,
                  organization: string,
                  location: string,
                  description: string
               }
               ...],
  skills: list of strings,
  insights: list of strings
}
```
