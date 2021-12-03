import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';
import userEvent from '@testing-library/user-event';

// Write up the two tests here and make sure they are testing what the title shows

test('renders without errors', () => {
	render(<CheckoutForm />);
});

test('shows success message on submit with form details', async () => {
	//Arrange: render the component
	render(<CheckoutForm />);

	//Act: set up variables for all items on form
	const firstNameField = screen.getByLabelText(/First Name:/i);
	const lastNameField = screen.getByLabelText(/Last Name:/i);
	const addressField = screen.getByLabelText(/Address:/i);
	const cityField = screen.getByLabelText(/City:/i);
	const stateField = screen.getByLabelText(/State:/i);
	const zipField = screen.getByLabelText(/Zip:/i);
	const submitButton = screen.getByRole('button');

	//Act: user events to populate the form and click submit
	userEvent.type(firstNameField, 'Jooonny');
	userEvent.type(lastNameField, 'Ive');
	userEvent.type(addressField, '66 road');
	userEvent.type(cityField, 'Charlotte');
	userEvent.type(stateField, 'NC');
	userEvent.type(zipField, '28213');

	userEvent.click(submitButton);

	//Assert: using await to find the success message and expect it to be in the document
	const successMessage = await screen.findByText(/You have ordered some plants! Woo-hoo!/i);
	expect(successMessage).toBeInTheDocument();
});
