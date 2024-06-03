export const regEmail =
  /^(([^<>{}()[\].,;:\s@"]+(\.[^<>{}()[\].,;:\s@"]+)*)|(".+"))@(([^<>(){}[\].,;:\s@"]+\.)+[^<>(){}[\].,;:\s@"]{2,})$/iu;
export const regName = /^(?=^[^1234567890!@#.;:=$%^&*()_<>{}]{1,20}$)(?![^1234567890.;:=!@#$%^&*()_<>{}]*\d)[^1234567890.;:=!@#$%^&*()_<>{}]+$/
export const regPhone = /^[0-9\+\-\(\)]{1,15}$/