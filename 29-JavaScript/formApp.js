function handleSubmit(){
    let id=document.getElementById("id").value;
    let name=document.getElementById("name").value;
    let course=document.getElementById("course").value;
    let grade=document.getElementById("grade").value;

    localStorage.setItem("id",id);
    localStorage.setItem("name",name);
    localStorage.setItem("course",course);
    localStorage.setItem("grade",grade);

   

}