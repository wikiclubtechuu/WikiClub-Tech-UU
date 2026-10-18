// FILE: src/lib/faq-data.ts
// All FAQ content lives here. To change wording, add or remove a question, edit this file only.
// Each question needs { q: "the question", a: "the answer" }.
// Optional: link: { label: "...", href: "..." } adds a link under the answer.

export type Faq = {
  q: string;
  a: string;
  link?: { label: string; href: string };
};

export type FaqCategory = {
  title: string;
  accent: string; // colour of the category: hd-accent-blue | green | teal | navy | amber
  items: Faq[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "About WikiClub Tech UU",
    accent: "hd-accent-blue",
    items: [
      {
        q: "What is WikiClub Tech UU?",
        a: "WikiClub Tech UU is a student-driven technical community at United University, Prayagraj. It encourages students to explore technology, participate in open-source projects, develop practical skills, and collaborate with other learners.",
      },
      {
        q: "What is the main objective of WikiClub Tech UU?",
        a: "Our objective is to bridge the gap between classroom learning and real-world technology. We aim to help students learn by doing, explore emerging technologies, contribute to meaningful projects, and grow through collaboration.",
      },
      {
        q: "What does WikiClub Tech UU actually do?",
        a: "We organize technical workshops, learning sessions, community activities, and collaborative initiatives. Depending on the program, students may explore programming, AI, open-source development, Wikimedia technologies, and other areas of technology.",
      },
      {
        q: "What is open source, and why does the club focus on it?",
        a: "Open source refers to software whose source code is made available under a license that permits people to use, study, modify, and share it according to the license terms. It allows students to learn from real projects, collaborate with developers, and build practical experience.",
      },
      {
        q: "Is WikiClub Tech UU only for students who are good at coding?",
        a: "No. Students can begin with little or no coding experience. Many activities are designed to introduce new concepts, while more advanced opportunities allow experienced students to deepen their skills.",
      },
      {
        q: "Is WikiClub Tech UU officially associated with United University?",
        a: "WikiClub Tech UU is a technical community based at United University, Prayagraj. For specific questions about institutional recognition, approvals, or official university documentation, please refer to the club's current official announcements.",
      },
      {
        q: "What makes WikiClub Tech UU different from learning technology through YouTube?",
        a: "YouTube is useful for learning concepts, but a community can offer additional opportunities to interact with peers, ask questions, participate in activities, collaborate on projects, and learn about real-world contribution workflows.",
      },
      {
        q: "Does WikiClub Tech UU organize only coding events?",
        a: "No. Activities can include technical workshops, open-source awareness, discussions, quizzes, collaborative projects, and community engagement. The topics and formats depend on the individual event.",
      },
      {
        q: "What does being part of a technical community mean?",
        a: "It means having opportunities to learn alongside other students, exchange ideas, participate in activities, and collaborate on projects. Your experience depends on how actively you participate.",
      },
      {
        q: "Where can I find official updates from WikiClub Tech UU?",
        a: "You can follow the club's official website and social media channels for announcements about upcoming events, registration forms, eligibility requirements, certificates, and other opportunities.",
        // Change "/" to the full website address if you want it to point somewhere else.
        link: { label: "Official website: WikiClub Tech UU", href: "/" },
      },
    ],
  },
  {
    title: "Membership and Eligibility",
    accent: "hd-accent-green",
    items: [
      {
        q: "Who can join WikiClub Tech UU?",
        a: "Students interested in technology, open-source development, collaborative learning, or community activities can explore the club's opportunities. Specific membership requirements, if any, will be communicated through official announcements.",
      },
      {
        q: "Can first-year students join WikiClub Tech UU?",
        a: "Yes! First-year students are encouraged to explore the club's activities. You don't need to wait until you have advanced technical skills to start learning, attending suitable events, and discovering your interests.",
      },
      {
        q: "Can second-year students benefit from joining the club?",
        a: "Absolutely. Second-year students can use club activities to strengthen their fundamentals, explore technologies beyond their coursework, collaborate on projects, and start building a portfolio of practical work.",
      },
      {
        q: "Is WikiClub Tech UU useful for third-year students?",
        a: "Yes. Third-year students can explore more advanced technical activities, strengthen their project experience, contribute to open-source repositories, and develop collaboration and leadership skills that complement their internship preparation.",
      },
      {
        q: "Do I need previous technical experience to participate?",
        a: "No previous experience is required for beginner-friendly activities. Some workshops or programs may require specific prerequisites, which will be mentioned in their announcements.",
      },
      {
        q: "Do students from non-technical branches have opportunities to participate?",
        a: "Students interested in technology and open knowledge can explore relevant activities. Eligibility may vary by event, so check the registration requirements before signing up.",
      },
      {
        q: "Is club membership free?",
        a: "Membership fees, if applicable, depend on the club's current membership policy. Please check the official membership announcement or contact the club team for confirmation.",
      },
      {
        q: "Do I have to be a club member to attend an event?",
        a: "Not necessarily. Some events may be open to all eligible students, while others may be restricted to members or registered participants. The event announcement will specify who can attend.",
      },
      {
        q: "Can I join the club even if I have never participated in a hackathon?",
        a: "Yes. Hackathon experience is not a prerequisite for getting started with technology communities. You can begin with introductory workshops and gradually explore projects, competitions, and other opportunities.",
      },
      {
        q: "How can I become an active member of WikiClub Tech UU?",
        a: "Start by following official announcements, attending relevant activities, asking questions, and participating in opportunities that interest you. You can also express interest in volunteering or contributing to club initiatives when applications open.",
      },
    ],
  },
  {
    title: "Certificates and Recognition",
    accent: "hd-accent-teal",
    items: [
      {
        q: "Will I receive a certificate for attending a WikiClub Tech UU event?",
        a: "Certificate availability depends on the specific event. Some events offer certificates to eligible participants, while others may focus on learning, collaboration, or project development without issuing certificates. Check the event announcement before registering.",
      },
      {
        q: "Are WikiClub Tech UU certificates free?",
        a: "The certificate itself may be included with event participation, but the applicable registration fee, if any, depends on the event. Check the official event details to confirm whether participation and certification involve any charges.",
      },
      {
        q: "What types of certificates can I receive through WikiClub Tech UU?",
        a: "Depending on the activity and its recognition policy, certificates may include participation, completion, or appreciation certificates. The specific type available will be mentioned in the relevant announcement.",
      },
      {
        q: "Is a certificate guaranteed after registering for an event?",
        a: "No. Registration alone should not be treated as a guarantee of certification. Certificate eligibility may depend on the event's rules, such as attendance, completion of required activities, or submission of assigned work.",
      },
      {
        q: "Do I need to attend the entire event to receive a certificate?",
        a: "Attendance requirements vary. Some events may require full attendance, while others may specify a minimum attendance threshold or additional participation requirements. Refer to the event guidelines for the exact criteria.",
      },
      {
        q: "Will I receive a certificate if I register but don't attend?",
        a: "Registration alone does not necessarily qualify you for a certificate. If an event requires attendance or participation, missing it may make you ineligible. Always review the certificate policy before registering.",
      },
      {
        q: "Are certificates provided digitally or in printed form?",
        a: "The format depends on the event. Certificates may be issued digitally or in physical form where applicable. The event announcement should specify the available format.",
      },
      {
        q: "How long does it take to receive my certificate?",
        a: "The distribution timeline varies by event. Certificates may be issued after attendance verification, completion of activities, or other required checks. If a timeline is announced, refer to it before contacting the organizers.",
      },
      {
        q: "What should I do if I haven't received my certificate?",
        a: "First, check the event announcement and any follow-up messages for the distribution timeline. If the expected date has passed, contact the event organizers through the official communication channel and provide your registration details.",
      },
      {
        q: "What if my certificate has a spelling mistake or incorrect details?",
        a: "Contact the organizing team through the official channel and explain the correction needed. Include the relevant event name and registration information so the team can verify your participation and determine whether a corrected certificate can be issued.",
      },
      {
        q: "Are WikiClub Tech UU certificates useful for my resume?",
        a: "Certificates can document participation, completion, or recognition, depending on what they represent. Their value is strongest when supported by the skills you gained, projects you completed, or contributions you made. Include certificates that are relevant to the opportunity you're applying for.",
      },
      {
        q: "Can I add my WikiClub Tech UU certificate to LinkedIn?",
        a: "Yes, you can generally share a certificate on LinkedIn if you received it legitimately and sharing is permitted. You can include the event name, issuing organization, and relevant skills. If the certificate has a verification link or credential ID, you can include it where available.",
      },
      {
        q: "Will I receive a certificate just for being a club member?",
        a: "Membership does not automatically imply certificate eligibility. Certificates may be associated with specific events, programs, contributions, or responsibilities. Any separate recognition for active members or volunteers depends on the club's official policy.",
      },
      {
        q: "Can I receive recognition for contributing to club projects or volunteering?",
        a: "Potentially, yes. Meaningful contributions and volunteering may be recognized through certificates or other forms of acknowledgment, depending on the initiative and its recognition policy. Students should confirm the criteria with the club team rather than assume that every contribution guarantees a certificate.",
      },
      {
        q: "Will a WikiClub Tech UU certificate guarantee an internship or placement?",
        a: "No. A certificate cannot guarantee an internship, job, or placement. However, the learning, practical experience, projects, and collaboration skills you develop through club activities can help strengthen your profile when combined with consistent effort.",
      },
    ],
  },
  {
    title: "Events, Registration, and Costs",
    accent: "hd-accent-navy",
    items: [
      {
        q: "Are WikiClub Tech UU events free to attend?",
        a: "Some events may be free, while others may have a registration fee. The applicable cost will depend on the individual event. Always check the official announcement or registration form before signing up.",
      },
      {
        q: "How much does a typical WikiClub Tech UU event cost?",
        a: "There is no single price that applies to every event. Costs depend on the format, resources, arrangements, and any applicable participation charges. The event announcement should state the fee, if any, before registration.",
      },
      {
        q: "Why do some technical events charge a registration fee?",
        a: "Where a fee applies, it may help cover event-related expenses such as venue arrangements, materials, refreshments, platform costs, or other logistical requirements. The actual reason should be specified by the organizers for that event.",
      },
      {
        q: "What does an event registration fee cover?",
        a: "It depends on the event. The fee may cover certain event resources or arrangements, but it should not be assumed to include refreshments, merchandise, certificates, or other extras unless the organizers explicitly confirm them.",
      },
      {
        q: "Are online events cheaper than offline events?",
        a: "Not necessarily, although online events can involve fewer physical arrangements. The actual price depends on the event's format and expenses. Check the individual event announcement for the applicable fee.",
      },
      {
        q: "Will I have to pay separately for a certificate?",
        a: "That depends on the event's pricing and certification policy. If certification is included in the registration fee, the announcement should say so. If a separate charge applies, it should be clearly disclosed before registration.",
      },
      {
        q: "Are there any hidden charges after registration?",
        a: "Students should be informed of all mandatory charges before registering. Any additional compulsory fees, if applicable, should be disclosed in the official event details. Do not make payments based solely on unofficial messages or personal requests.",
      },
      {
        q: "Can I get a refund if I register but cannot attend?",
        a: "Refund eligibility depends on the event's cancellation and refund policy. Check the terms before making a payment. If the policy is unclear, contact the organizers before registering rather than assuming a refund will be available.",
      },
      {
        q: "How do I register for a WikiClub Tech UU event?",
        a: "Follow the registration instructions provided in the official event announcement. Complete the required form accurately, provide the requested details, and follow any payment or confirmation instructions specified by the organizers.",
      },
      {
        q: "How will I know whether my registration is confirmed?",
        a: "Follow the confirmation process described in the event announcement. Depending on the event, confirmation may be provided through email, a registration platform, or an official communication channel. Submitting a form does not always mean that your seat is confirmed.",
      },
      {
        q: "What happens if an event is cancelled or rescheduled?",
        a: "The organizers should communicate any cancellation or schedule change through official channels. If you have registered or paid a fee, follow the instructions provided regarding revised arrangements, refunds, or alternative participation options.",
      },
    ],
  },
  {
    title: "Learning, Projects, and Career Development",
    accent: "hd-accent-amber",
    items: [
      {
        q: "What skills can I learn through WikiClub Tech UU?",
        a: "Depending on the activities you participate in, you can explore programming, open-source workflows, collaboration, problem-solving, technical communication, project development, and emerging technologies. Specific skills depend on the event or program.",
      },
      {
        q: "Can WikiClub Tech UU help me build projects for my resume?",
        a: "Club activities may provide opportunities to collaborate on projects and develop practical experience. The opportunities available will depend on current initiatives and eligibility requirements. Your strongest resume entries will be those that describe your actual contributions and results.",
      },
      {
        q: "Can I contribute to open-source projects even if I am a beginner?",
        a: "Yes. Beginners can start by learning how repositories work, understanding contribution guidelines, improving documentation, reporting reproducible issues, or exploring beginner-friendly tasks. As your skills improve, you can move towards code contributions and more complex projects.",
      },
      {
        q: "How can I make the most of WikiClub Tech UU during my first three years of college?",
        a: "Start by exploring beginner-friendly activities and identifying your interests. Build a foundation in your chosen area, practice consistently, collaborate on projects, and gradually take on more challenging responsibilities. Focus on learning and making genuine contributions rather than collecting certificates alone.",
      },
    ],
  },
];