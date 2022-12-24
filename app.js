let dataa;
let idModalType = "#structure-model";
let idQuestionPrefix = "structure-contenue";
let idButtonReponse = "#reponse";
let buttonTest = document.querySelector("#test01");
let boutonConfirmer = document.querySelector("#confirmer");
let p_Total=document.querySelector("#total");
let span_Bonne_Reponse = document.querySelector("#bonne_reponses");
let span_total_bonne_reponses = document.querySelector("#total_bonne_reponses");
let modaleType = document.querySelector(idModalType);
let blockQuestion = document.querySelector("#structure-question");
let indexQuestion = 0;
let indexModalQuestion = 1;
let indexdata = 0;
let dataSubObject = ["enter", "question","fin"];
let dataChoix = dataSubObject[indexdata];

let questionTotal=0
let bonneReponse=0

let  question_actuel

window.onload = function (event) {
  localStorage.clear()
  buttonTest.addEventListener("click", () => {

    if (indexQuestion == dataa[dataChoix].length) {
      indexdata++;
      setDataChoix(indexdata);
      indexQuestion = 0;
      if (dataSubObject.length == indexdata) {
        indexdata = 0;
        setDataChoix(indexdata);
      }
    }
    let ancienQuestion = document.getElementById(
      idQuestionPrefix + (indexModalQuestion - 1)
    );
    ancienQuestion.remove();

    if (indexdata == 1) {
      question_actuel = new Question(
        dataa[dataChoix][indexQuestion],
        indexModalQuestion
      );
      blockQuestion.append(question_actuel.HTML);
      buttonTest.classList.add("hiddenButton");
      localStorage.setItem("question"+indexModalQuestion,JSON.stringify(question_actuel))
      p_Total.hidden=false
      span_Bonne_Reponse.innerText =bonneReponse
      span_total_bonne_reponses.innerText = questionTotal
      
    } else {
      p_Total.hidden
      let eee = modaleType.cloneNode(true);
      eee.id = idQuestionPrefix + indexModalQuestion;
      eee.hidden = false;
      let content = eee.querySelector(".content");
      content.innerHTML = dataa[dataChoix][indexQuestion];
      
      blockQuestion.insertBefore(eee, blockQuestion.firstChild);
      if (indexdata == 2 && (dataa[dataChoix].length-1) == indexQuestion) {
        console.log("fzefez");
        document.querySelector('#lien_page').hidden = false
        buttonTest.hidden = true
      }
    }
    
    indexQuestion++;
    indexModalQuestion++;

    // document.querySelectorAll(".question").forEach((elem,i,listQuestion)=>{
    //   elem.addEventListener('click',()=>{

    //     if (elem.classList.contains('reponseChoisi')){
    //       elem.classList.remove('reponseChoisi')
    //       if (reveleBonneReponces(listQuestion,"hiddenButton")) {

    //         buttonTest.classList.remove("hiddenButton")
    //         boutonConfirmer.classList.add("hiddenButton")

    //       }
    //     }else{
    //       elem.classList.add('reponseChoisi')
    //       if (boutonConfirmer.classList.contains('hiddenButton')) {

    //         buttonTest.classList.add("hiddenButton")
    //         boutonConfirmer.classList.remove("hiddenButton")

    //       }
    //     }
    //   })
    // })
  });

};
fetch("question.json")
  .then((Response) => Response.json())
  .then((data) => {
    dataa = data;
  });

function setDataChoix(indexdataTemp) {
  dataChoix = dataSubObject[indexdataTemp];
}

function checkquestions() {

  const question = new Question(JSON.parse(localStorage.getItem('question'+(indexModalQuestion-1))));
  question.valideQuestion()
}

class Question {
  dejaPasser = true;
  question_Selectionner;
 
  constructor(obj, id) {
    if (id == null) {
      this.id = obj.id;
      this.question = obj.question;
      this.reponseList= obj.reponseList;
      this.reponse0 = obj.reponse0;
      this.reponse1 = obj.reponse1;
      this.reponse2 = obj.reponse2;
      this.reponse3 = obj.reponse3;

      this.HTML = this.getConstruitHtml()

    }else{
      this.id = id;
      this.question = obj.question;
      this.reponseList= obj.reponse;
      this.reponse0 = obj.reponse[0];
      this.reponse1 = obj.reponse[1];
      this.reponse2 = obj.reponse[2];
      this.reponse3 = obj.reponse[3];
  
      this.HTML = this.getConstruitHtml()
      this.dejaPasser = true;
      this.actions();
    }
  }

  actions() {

    this.HTML.addEventListener("click", (e) => {
      let questionCliquer = e.target;
      if(questionCliquer.type=="submit"){
        questionCliquer.classList.toggle("reponseChoisi");
        this.question_Selectionner = [...document.querySelectorAll("#" + idQuestionPrefix + this.id + " .reponseChoisi")]
        this.selectionneQuestion();
      }
    });
    // boutonConfirmer.addEventListener('click',()=>this.valideQuestion())
  }
  selectionneQuestion() {

    let ListQuestionSelectionner = this.question_Selectionner.length;

    if (ListQuestionSelectionner == 1 && this.dejaPasser) {
      this.dejaPasser = false;
      inverse();
    }
    if (ListQuestionSelectionner == 0) {
      this.dejaPasser = true;
      inverse();
    }

    function inverse() {
      boutonConfirmer.classList.toggle("hiddenButton");
    }
  }

  getConstruitHtml() {

    let structure_contenue = document.createElement("div");
    structure_contenue.id = idQuestionPrefix + this.id;

    let p = document.createElement("p");
    p.classList.add("content");
    p.innerHTML = this.question+'?';

    let question_list = document.createElement("div");
    question_list.classList.add("question-list");

    let bouton0 = document.createElement("button");
    bouton0.id = "reponse";
    bouton0.classList.add("question");
    bouton0.value = this.reponse0.valeur;
    bouton0.innerText = this.reponse0.labelle;

    let bouton1 = document.createElement("button");
    bouton1.id = "reponse";
    bouton1.classList.add("question");
    bouton1.value = this.reponse1.valeur;
    bouton1.innerText = this.reponse1.labelle;

    let bouton2 = document.createElement("button");
    bouton2.id = "reponse";
    bouton2.classList.add("question");
    bouton2.value = this.reponse2.valeur;
    bouton2.innerText = this.reponse2.labelle;

    let bouton3 = document.createElement("button");
    bouton3.id = "reponse";
    bouton3.classList.add("question");
    bouton3.value = this.reponse3.valeur;
    bouton3.innerText = this.reponse3.labelle;

    question_list.append(bouton0, bouton1, bouton2, bouton3);
    structure_contenue.append(p, question_list);


    return structure_contenue;
  }
  valideQuestion(){
    let question_list = [...document.querySelectorAll(`#structure-contenue${indexModalQuestion-1} .question`)]
    
    this.reponseList.forEach((question,i)=>{
      if (question.valeur == Boolean(question_list[i].value)) {
        question_list[i].classList.add('bonne-reponse')
        questionTotal++
        if (question_list[i].classList.contains('reponseChoisi')) {
          bonneReponse++
        }
      }else{
        question_list[i].classList.add('mauvaise-reponse')
      }
    })
    
    boutonConfirmer.classList.add("hiddenButton");

    buttonTest.classList.remove("hiddenButton");
  }

}
