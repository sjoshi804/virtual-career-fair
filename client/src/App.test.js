import React from 'react';
import { render } from '@testing-library/react';
import RecruiterVideoCall from './Pages/RecruiterVideoCall';
import StudentLivePage from './Pages/StudentLivePage';
import OrganizerUpcomingPage from './Pages/OrganizerUpcomingPage'
import SearchPage from './Pages/SearchPage'

test('Rcruiter Video Call Page', () => {
  const { getByText, getByRole } = render(<RecruiterVideoCall />);
  const linkElement = getByText(/Video Call/i);
  expect(linkElement).toBeInTheDocument();
  const buttonElement = getByRole('button', {name: /save/i});
  expect(buttonElement).not.toHaveAttribute('disabled');
});

test('Student Live Page', () => {
  const { getAllByRole } = render(<StudentLivePage />);
  const buttonElement = getAllByRole('button', {name: /in session/i});
  buttonElement.forEach(element => expect(element).not.toHaveAttribute('disabled'));
});

test('Organizer Upcoming Page', () => {
  const { getByRole, getByText } = render(<OrganizerUpcomingPage />);
  const editButton = getByRole('button', {name: /edit fair/i});
  const backButton = getByRole('button', {name: /Back to Profile Page/i});
  const recruiterTextElement = getByText(/Recruiters Registered/i);
  const studentsTextElement = getByText(/Students Registered/i);
  const companiesTextElement = getByText(/Companies Registered/i);
  expect(recruiterTextElement).toBeInTheDocument();
  expect(studentsTextElement).toBeInTheDocument();
  expect(companiesTextElement).toBeInTheDocument();
  expect(editButton).not.toHaveAttribute('disabled'); 
  expect(backButton).not.toHaveAttribute('disabled'); 
});

test('Search Page', () => {
  const { getByText, getByPlaceholderText } = render(<SearchPage />);
  const companyTextElement = getByText(/company/i);
  const jobTextElement = getByText(/job/i);
  const CFTextElement = getByText(/career fair/i);
  const placeholderElement = getByPlaceholderText(/Search Keywords/i);
  expect(companyTextElement).toBeInTheDocument();
  expect(jobTextElement).toBeInTheDocument();
  expect(CFTextElement).toBeInTheDocument();
  expect(placeholderElement).toBeInTheDocument();
});
