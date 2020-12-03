import React from 'react';
import { getAllByRole, render } from '@testing-library/react';
import RecruiterVideoCall from './Pages/RecruiterVideoCall';
import StudentProfilePage from './Pages/StudentProfilePage';
import OrganizerUpcomingPage from './Pages/OrganizerUpcomingPage'
import SearchPage from './Pages/SearchPage'

test('Rcruiter Video Call Page', () => {
  const { getByText, getByRole } = render(<RecruiterVideoCall />);
  const linkElement = getByText(/Video Call/i);
  expect(linkElement).toBeInTheDocument();
  const buttonElement = getByRole('button', {name: /save/i});
  expect(buttonElement).not.toHaveAttribute('disabled');
});

test('Student Profile Page', () => {
  const { getAllByText, getAllByRole } = render(<StudentProfilePage />);
  const buttonElements = getAllByRole('button');
  const linkElements = getAllByText(/View Details/i);
  linkElements.forEach(element => expect(element).toBeInTheDocument());
  buttonElements.forEach(element => expect(element).not.toHaveAttribute('disabled'));
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
