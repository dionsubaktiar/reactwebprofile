export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  image: string | null;
}

const INITIAL_USERS: UserProfile[] = [
  {
    id: "1",
    name: "Dion Subaktiar",
    email: "dionsubaktiar@gmail.com",
    bio: "Fullstack Software Engineer specializing in .NET, Laravel, Next.js, and corporate transport logistics systems.",
    image: null,
  },
  {
    id: "2",
    name: "Sarah Oktaviani",
    email: "sarah.oktaviani@techcorp.id",
    bio: "Lead Product Designer & Design Systems Specialist focused on WCAG accessibility and responsive web interfaces.",
    image: null,
  },
  {
    id: "3",
    name: "Bambang Sudiro",
    email: "bambang.s@logistikprima.co.id",
    bio: "Fleet & Logistics Operations Manager overseeing domestic freight coordination.",
    image: null,
  },
  {
    id: "4",
    name: "Ahmad Rizky",
    email: "ahmad.rizky@architech.io",
    bio: "Backend Systems Architect working on high-throughput transactional APIs.",
    image: null,
  },
  {
    id: "5",
    name: "Dewi Lestari",
    email: "dewi.lestari@fintech.co.id",
    bio: "Financial Systems Analyst focused on credit risk and installment engines.",
    image: null,
  },
  {
    id: "6",
    name: "Hendro Wibowo",
    email: "hendro.wibowo@enterprise.net",
    bio: "Enterprise Infrastructure & DevOps Engineer managing cloud deployments.",
    image: null,
  },
];

export const usersStore: { items: UserProfile[]; nextIdCounter: number } = {
  items: INITIAL_USERS.map((u) => ({ ...u })),
  nextIdCounter: 7,
};
