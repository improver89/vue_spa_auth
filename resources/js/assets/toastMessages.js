const toastMessages = function () {
    return {
        contactsIsValidated() {
            return {
                title: "You validated your contacts",
                message: 'Sing in, please',
                timeOut: 7000
            };
        },
        contactsIsNotValidated() {
            return {
                title: "The validation code is wrong or expired",
                message: 'Repeat validation process again'
            };
        },
        validationCode(number) {
            return {
                title: "You will receive validation code in couple of seconds. Please wait...",
                message: 'Validation code sent to: ' + number,
                timeOut: 7000
            };
        },
        contactsDuplicated() {
            return {
                title: "Some error has been occurred",
                message: 'Contacts that you sent already had been registered'
            };
        },
        validation() {
            return {
                title: "You have to validate your contacts",
                message: "Enter your contacts, then we send message to you"
            };
        },
        badAuthCredentials() {
            return {
                title: "Auth credentials are wrong",
                message: "Check your auth credentials and try to login"
            };
        },
        userIsDisabled() {
            return {
                title: "User is disabled",
                message: "Ask your administrator about it"
            };
        },
        logout() {
            return {
                title: "You have been logged out",
                message: "See you later..."
            };
        },
        error(message) {
            return {
                title: "Some error has been occurred",
                message: message
            };
        },
        badData() {
            return {
                title: "Bad data has been received from server",
                message: "Call to the service administrator, please"
            };
        },
        connectionError() {
            return {
                title: "Connection error",
                message: "May be you have a trouble with your internet connection"
            };
        },
        authorizationError() {
            return {
                title: "Error has been happened",
                message: "You have to authorize in the service"
            };
        },
        userHasBeenDeleted() {
            return {
                title: "User has been deleted",
                message: "Everything is alright"
            };
        },
        userHasNotBeenDeleted(message) {
            return {
                title: "User has NOT been deleted",
                message: message
            };
        },
        changesAccepted() {
            return {
                title: "Changes has been accepted",
                message: "Everything is alright"
            };
        },
        changesNotAccepted(message) {
            return {
                title: "Changes has NOT been accepted",
                message: message
            };
        },
        passwordConfirmationFailed() {
            return {
                title: "Password confirmation does not match",
                message: "Passwords must match"
            };
        },
        userHasNotBeenCreated(message) {
            return {
                title: "User has NOT been created",
                message: message
            };
        },
        userHasBeenCreated() {
            return {
                title: "User has been created",
                message: "Everything is alright"
            };
        }
    }
}();

export default toastMessages;
