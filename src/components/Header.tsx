import { useState } from 'react';
import { Row, Icon } from '.';

const navLinks = [
  { href: '/jobs', label: 'Jobs' },
  { href: '/candidate', label: 'Candidate' },
  { href: '/crm', label: 'CRM' },
  { href: '/reports', label: 'Reports' },
  { href: '/integrations', label: 'Integrations' },
];

const Header = () => {
  const [activeLink, setActiveLink] = useState('/candidate');

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-4 bg-white border-b border-cloud">
      <Row className="gap-4">
        <Row className="gap-1">
          <img
            src="/logo.png"
            width={175}
            height={20}
            alt="hero"
            className="cursor-pointer"
          />
          <Icon name="ArrowDown" width={24} height={24} />
        </Row>

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setActiveLink(link.href)}
            className={`hidden md:block text-base ${
              activeLink === link.href ? 'text-success underline underline-offset-3 decoration-2' : 'text-abyss hover:text-success/50'
            }`}
          >
            {link.label}
          </a>
        ))}
      </Row>

      <Row className="gap-3">
        <Icon name="Setting" width={32} height={32} />
        <Icon name="Info" width={24} height={24} />

        <Row className="ml-1 w-6 h-6 rounded-full border border-abyss text-abyss font-medium border-grey justify-center text-xs">
          AC
        </Row>
      </Row>
    </header>
  );
};

export default Header;
