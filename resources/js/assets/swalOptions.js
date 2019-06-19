const swalOptions = function () {
    return {
        saveUserWithOutNewPassword() {
            return {
                title: 'Save changes?',
                text: 'Password will have not changed!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Save!'
            };

        },
        saveUserWithNewPassword() {
            return {
                title: 'Save changes?',
                text: 'Password will have changed!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Save!'
            };
        },
        deleteUser() {
            return {
                title: `Are you sure?`,
                text: `User will be deleted`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Delete!'
            }
        }
    }
}();

export default swalOptions;
