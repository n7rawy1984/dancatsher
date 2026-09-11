import { company } from '@/data/company';
export interface Enquiry {
  name: string;
  business: string;
  email: string;
  division: string;
  requirements: string;
}
export type EnquiryResult = { status: 'invalid' } | { status: 'prepared'; mailto: string };
/** Preview-only email draft adapter. Automatic delivery awaits an approved provider. */
export function prepareEnquiry(enquiry: Enquiry, subject: string): EnquiryResult {
  if (
    !enquiry.name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) ||
    !enquiry.division ||
    !enquiry.requirements.trim() ||
    !company.email
  )
    return { status: 'invalid' };
  const body = [
    enquiry.name,
    enquiry.business,
    enquiry.email,
    enquiry.division,
    '',
    enquiry.requirements,
  ].join('\n');
  return {
    status: 'prepared',
    mailto: `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

export interface ContactEnquiry extends Enquiry {
  phone: string;
  subject: string;
}

export function prepareContactEnquiry(
  enquiry: ContactEnquiry,
  defaultSubject: string,
): EnquiryResult {
  if (
    !enquiry.name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) ||
    (enquiry.phone && !/^[+\d][\d\s().-]{6,24}$/.test(enquiry.phone)) ||
    !enquiry.division ||
    !enquiry.requirements.trim() ||
    !company.email
  ) {
    return { status: 'invalid' };
  }

  const body = [
    `Name: ${enquiry.name}`,
    enquiry.business ? `Company: ${enquiry.business}` : '',
    `Email: ${enquiry.email}`,
    enquiry.phone ? `Phone: ${enquiry.phone}` : '',
    `Area of interest: ${enquiry.division}`,
    enquiry.subject ? `Enquiry type: ${enquiry.subject}` : '',
    '',
    enquiry.requirements,
  ].filter((line, index) => line || index === 6);

  return {
    status: 'prepared',
    mailto: `mailto:${company.email}?subject=${encodeURIComponent(enquiry.subject || defaultSubject)}&body=${encodeURIComponent(body.join('\n'))}`,
  };
}
