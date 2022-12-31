var popup;
var popup2;
var is_work_about = 0;
var is_work_term = 0;
var is_work_privacy = 0;
function turn_off() {
        popup.classList.toggle("show");
        popup2.classList.toggle("show");
        popup = null;
        popup2 = null;
}

function About() {
  if (is_work_term == 1){
    turn_off();
    is_work_term = 0;
  } 
  if (is_work_privacy == 1){
    turn_off();
    is_work_privacy = 0;
  } 
  if (is_work_about == 1){
    turn_off();
    is_work_about = 0;
  }else{
    popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    popup2 = document.getElementById("myPopup2");
    popup2.classList.toggle("show");
    is_work_about = 1;
  }

}

function TermsOfUse() {
  if (is_work_about == 1){
    turn_off();
    is_work_about = 0;
  }
  if (is_work_privacy == 1){
    turn_off();
    is_work_privacy = 0;
  }
  if (is_work_term == 1){
    turn_off();
    is_work_term = 0;
  }else{
    popup = document.getElementById("myPopup3");
    popup.classList.toggle("show");
    popup2 = document.getElementById("myPopup4");
    popup2.classList.toggle("show");
    is_work_term = 1;
  }
  
}
function PrivacyPolicy() {
  if (is_work_about == 1){
    turn_off();
    is_work_about = 0;
  } 
  if (is_work_term == 1){
    turn_off();
    is_work_term = 0;
  } 
  if (is_work_privacy == 1){
    turn_off();
    is_work_privacy = 0;
  }else{
    popup = document.getElementById("myPopup5");
    popup.classList.toggle("show");
    popup2 = document.getElementById("myPopup6");
    popup2.classList.toggle("show");
    is_work_privacy = 1;
  }
  
}