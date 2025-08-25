export type PasswordPolicy = {
    minLength: number;
    requireUpper: boolean;
    requireLower: boolean;
    requireDigit: boolean;
    requireSpecial: boolean;
  };
  
  export type DobParts = {
    day: string;        // "1".."31"
    monthValue: string; // "1".."12"
    monthLabel: string; // "January"
    year: string;       // "1985"
    iso: string;        // "1985-01-09"
  };
  
  export type AddressParts = {
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
  };
  
  export function uniqueEmail(seed = 'user', domain = 'example.com', prefix = 'e2e') {
    const ts = Date.now();
    const rnd = Math.random().toString(36).slice(2, 8);
    const local = `${prefix}+${seed}.${ts}.${rnd}`;
    return `${local}@${domain}`;
  }
  
  export function generatePassword(policy: Partial<PasswordPolicy> = {}) {
    const base: PasswordPolicy = {
      minLength: 12,
      requireUpper: true,
      requireLower: true,
      requireDigit: true,
      requireSpecial: true,
    };
    const p = { ...base, ...policy };
  
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowers = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specials = '!@#$%^&*()-_=+[]{};:,.<>?';
  
    let pool = '';
    if (p.requireUpper) pool += uppers;
    if (p.requireLower) pool += lowers;
    if (p.requireDigit) pool += digits;
    if (p.requireSpecial) pool += specials;
    if (!pool) pool = uppers + lowers + digits;
  
    const pick = (s: string) => s.charAt(Math.floor(Math.random() * s.length));
  
    const required: string[] = [];
    if (p.requireUpper) required.push(pick(uppers));
    if (p.requireLower) required.push(pick(lowers));
    if (p.requireDigit) required.push(pick(digits));
    if (p.requireSpecial) required.push(pick(specials));
  
    const remaining = Math.max(p.minLength - required.length, 0);
    const rest = Array.from({ length: remaining }, () => pick(pool));
    const chars = [...required, ...rest];
  
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
  }
  
  export function generateDateOfBirthParts(minAge = 18, maxAge = 65): DobParts {
    if (minAge < 0 || maxAge < 0 || maxAge < minAge) {
      throw new Error(`Invalid age range: minAge=${minAge}, maxAge=${maxAge}`);
    }
    const today = new Date();
    const maxDob = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const minDob = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const ts = randInt(minDob.getTime(), maxDob.getTime());
    const d = new Date(ts);
  
    const monthsEn = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];
    const year = String(d.getFullYear());
    const monthIndex = d.getMonth();
    const monthValue = String(monthIndex + 1);
    const monthLabel = monthsEn[monthIndex];
    const day = String(d.getDate());
  
    const iso = toISO(d);
    return { day, monthValue, monthLabel, year, iso };
  }
  
  export function generateAddress(overrides: Partial<AddressParts> = {}): AddressParts {
    const country = 'United States';
    const statesUS = ['CA', 'TX', 'NY', 'FL', 'WA', 'IL', 'AZ', 'GA'];
    const citiesUS = ['San Francisco', 'Austin', 'New York', 'Miami', 'Seattle', 'Chicago', 'Phoenix', 'Atlanta'];
  
    const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  
    const streetNames = ['Main', 'Oak', 'Maple', 'Cedar', 'Pine', 'Elm', 'Sunset', 'Riverside', 'Lake', 'Hill'];
    const streetTypes = ['St', 'Ave', 'Blvd', 'Rd', 'Way', 'Ln', 'Dr', 'Terrace'];
    const number = randInt(10, 9999);
    const street = `${pick(streetNames)} ${pick(streetTypes)}`;
    const state = pick(statesUS);
    const city = pick(citiesUS);
    const address = overrides.address ?? `${number} ${street}`;
    const zipcode = overrides.zipcode ?? randDigits(5);
  
    return { address, country, state, city, zipcode};
  }
  
  export function randomFirstName() {
    const names = ['Daniel', 'Jeremy', 'Randy', 'Louis', 'María', 'Diego', 'Lucía', 'Javier', 'Valentina', 'Pedro'];
    return names[Math.floor(Math.random() * names.length)];
  }
  export function randomLastName() {
    const names = ['Castro', 'Gonzales', 'Jimenez', 'Martínez', 'Mora', 'Chamorro', 'Sánchez', 'Díaz', 'Fernández'];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  function randDigits(n: number) {
    let s = '';
    for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10);
    return s;
  }
  function randInt(minInclusive: number, maxInclusive: number) {
    const min = Math.ceil(minInclusive);
    const max = Math.floor(maxInclusive);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function toISO(d: Date) {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
