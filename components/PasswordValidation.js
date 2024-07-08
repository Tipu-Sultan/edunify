import React from 'react';

const PasswordValidateHint = ({ newPassword, passwordValid }) => {
    return (
        <div className="mt-4">
            {newPassword && (
                <div className="text-sm">
                    <p className="mb-2">Password must contain:</p>
                    <ul className="list-disc pl-4">
                        <li className="flex items-center mb-1">
                            <span className="mr-2">At least 8 characters</span>
                            {passwordValid.length ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM4.293 8.293a1 1 0 011.414-1.414l1.525 1.525 3.722-3.722a1 1 0 111.414 1.414l-4.5 4.5a1 1 0 01-1.414 0l-3.5-3.5z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM5.293 6.293a1 1 0 011.414-1.414l8 8a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            )}
                        </li>
                        <li className="flex items-center mb-1">
                            <span className="mr-2">At least one lowercase letter</span>
                            {passwordValid.lowercase ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM4.293 8.293a1 1 0 011.414-1.414l1.525 1.525 3.722-3.722a1 1 0 111.414 1.414l-4.5 4.5a1 1 0 01-1.414 0l-3.5-3.5z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM5.293 6.293a1 1 0 011.414-1.414l8 8a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            )}
                        </li>
                        <li className="flex items-center mb-1">
                            <span className="mr-2">At least one uppercase letter</span>
                            {passwordValid.uppercase ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM4.293 8.293a1 1 0 011.414-1.414l1.525 1.525 3.722-3.722a1 1 0 111.414 1.414l-4.5 4.5a1 1 0 01-1.414 0l-3.5-3.5z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM5.293 6.293a1 1 0 011.414-1.414l8 8a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            )}
                        </li>
                        <li className="flex items-center mb-1">
                            <span className="mr-2">At least one number</span>
                            {passwordValid.number ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM4.293 8.293a1 1 0 011.414-1.414l1.525 1.525 3.722-3.722a1 1 0 111.414 1.414l-4.5 4.5a1 1 0 01-1.414 0l-3.5-3.5z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM5.293 6.293a1 1 0 011.414-1.414l8 8a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            )}
                        </li>
                        <li className="flex items-center mb-1">
                            <span className="mr-2">At least one special character (@, #, $, etc.)</span>
                            {passwordValid.specialChar ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM4.293 8.293a1 1 0 011.414-1.414l1.525 1.525 3.722-3.722a1 1 0 111.414 1.414l-4.5 4.5a1 1 0 01-1.414 0l-3.5-3.5z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zM5.293 6.293a1 1 0 011.414-1.414l8 8a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PasswordValidateHint;
