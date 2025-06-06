import {Oct8} from './Oct8/Oct8.js';
var Oct_8 = new Oct8()
var Remove_flag = false
var Modificar = false
var Obj_modify =  null

var GameConfiguration = {
    CombateBase : 1,
    Area:3,
    Turnos: 10,
    Jogadores: 2,   
    PontosIniciais: 20,
    CompraCartas: 1,
    CartasDeck: 40,
    CartasMao: 5,
    Procura: 1,
    Compra:1
}

var CalculateBase = {
    Agro: {Combate:1,Compra:-1,Area:0,Procura:0},
    Tempo: {Combate:0,Compra:1,Area:-1,Procura:0},
    Control: {Combate:0,Compra:-1,Area:1,Procura:0},
    Combo: {Combate:0,Compra:0,Area:-1,Procura:1}
}


Oct_8.createNewTag("tempo",()=>{return "<div class=' pill tempo'>tempo</div>"})
Oct_8.createNewTag("control",()=>{return "<div class=' pill control'>control</div>"})
Oct_8.createNewTag("combo",()=>{return "<div class=' pill combo'>combo</div>"})
Oct_8.createNewTag("energia",()=>{return "<div class=' pill energia'>energia</div>"})


Oct_8.ReactiveTags(document.getElementById("document"),true)

// Criação do menu 
//#region Menu
document.getElementById("NewAgro").addEventListener("click", (e) => {
   // document.getElementById("document").innerHTML += `<agro class="note" draggable="true" style=''></agro>`
    document.getElementById("document").innerHTML+= `
    <agro class="note" draggable="true" style="cursor: grab;"><div class="pill agro">Agro </div></agro>
    `
    createTimeline()
})

document.getElementById("Newcontrol").addEventListener("click", (e) => {
    //document.getElementById("document").innerHTML += `<control class="note"  draggable="true"></control>`
    document.getElementById("document").innerHTML+= `
<control class="note" draggable="true" style="cursor: grab;"><div class=" pill control">control</div></control>    `
   // Oct_8.ReactiveTags(document.getElementById("document"))
    createTimeline()
})


document.getElementById("NewTempo").addEventListener("click", (e) => {
    document.getElementById("document").innerHTML+= `
    <tempo class="note"  draggable="true">
    <div class=' pill tempo'>tempo</div>
    </tempo>
    `
    createTimeline()
})

document.getElementById("NewCombo").addEventListener("click", (e) => {
    document.getElementById("document").innerHTML+= `
    <combo class="note"  draggable="true">
        <div class=' pill combo' style='width: 20vh;'>combo</div>
    </combo>
    `
    createTimeline()
})

document.getElementById("NewCusto").addEventListener("click", (e) => {
     document.getElementById("document").innerHTML+= `
     <energia class="note"  draggable="true">
        <div class=' pill energia'>energia</div>
     </energia>
     `
    createTimeline()
})

document.getElementById("SetupJog").addEventListener("click", (e) => {
    RenderTela()
})

document.getElementById("exec").addEventListener("click", (e) => {
    RenderCard()
})

document.getElementById("remove").addEventListener("click", (e) => {
    Modificar = false
     document.getElementById("modificar").innerText = "Modificar Mecanica"
    if(Remove_flag == false)
    {
        Remove_flag = true
        document.getElementById("remove").innerText = "Parar Remoção"
    }
    else
    {
        Remove_flag = false
        document.getElementById("remove").innerText = "Remover Mecanica"
    }
})

document.getElementById("modificar").addEventListener("click", (e) => {
    Remove_flag = false
    document.getElementById("remove").innerText = "Remover Mecanica"
    if(Modificar == true)
        {
            Modificar = false
            document.getElementById("screenModify").remove()
            document.getElementById("modificar").innerText = "Modificar Modificação"
        }
    else{
            Modificar = true
            Oct_8.AppendObjectFacyotyTo("screenModify",null)
            document.getElementById("modificar").innerText = "Parar Mecanica"
        }
})




//#endregion

Oct_8.CreateObjectFactory(()=>{
    let Screen = Oct_8.CreateContainerElement("setup","document","div","div")
    document.getElementsByTagName("nav")[0].style.display = "none"
    Oct_8.ModifyContentContainer(Screen,`
    <div class="Screen">
    <button class="btn btn-primary" id="closeSetup">X</button>
    <h1>Setup Jogo</h1>
    <div class="setup_contet">
        <label>Pontos Iniciais</label>
        <label>Pontos Iniciais</label>
        <input type="number" id="startPoint" value="${GameConfiguration.PontosIniciais}" />

        <label>Quantidade de turnos</label>
        <input type="number" id="QtdTurnos" value="${GameConfiguration.Turnos}" />
        <label></label>

        <label>Quantidade de Jogadores</label>  
        <input type="number" id="QuantidaeJogadores" value="${GameConfiguration.Jogadores}" />

        <label>Quantidade de cartas no deck</label>  
        <input type="number" id="QuantidaeCartasDeck" value="${GameConfiguration.CartasDeck}" />

        <label>Quantidade de cartas na mão</label>
        <input type="number" id="QuantidaeCartasMao" value="${GameConfiguration.CartasMao}" />

        <label>Quantidade de cartas compradas por turno</label>
        <input type="number" id="QuantidaeCartasCompradas" value="${GameConfiguration.CompraCartas}" />

        <label>Combate Base</label>
        <input type="number" id="CombateBase" value="${GameConfiguration.CombateBase}" />

        <label>Área de Combate</label>
        <input type="number" id="AreaCombate" value="${GameConfiguration.Area}" />

        <label>Procura Cartas</label>
        <input type="number" id="Procura" value="${GameConfiguration.Procura}" />

        <hr>
    </div>
        
        <button id='SalvarBt'>Salvar</button>
    </div>
        `)
    document.getElementById("closeSetup").addEventListener("click", (e) => {
        document.getElementById("setup").remove();  
        document.getElementsByTagName("nav")[0].style.display = "flex"
    })

    document.getElementById("SalvarBt").addEventListener("click", (e) => {
        document.getElementsByTagName("nav")[0].style.display = "flex"
        
        GameConfiguration.PontosIniciais = parseInt(document.getElementById("startPoint").value)
        GameConfiguration.Turnos = parseInt(document.getElementById("QtdTurnos").value)
        GameConfiguration.Jogadores = parseInt(document.getElementById("QuantidaeJogadores").value)
        GameConfiguration.CartasDeck = parseInt(document.getElementById("QuantidaeCartasDeck").value)
        GameConfiguration.CartasMao = parseInt(document.getElementById("QuantidaeCartasMao").value)
        GameConfiguration.CompraCartas = parseInt(document.getElementById("QuantidaeCartasCompradas").value)
        GameConfiguration.CombateBase = parseInt(document.getElementById("CombateBase").value)
        GameConfiguration.Area = parseInt(document.getElementById("AreaCombate").value)
        GameConfiguration.Procura = parseInt(document.getElementById("Procura").value)
      
        document.getElementById("setup").remove();  
    })
},"setup")

Oct_8.CreateObjectFactory(()=>{
    let Valor_tela = ""
    if(Obj_modify != null)
    {
        let InitialValue = String(Obj_modify.getElementsByClassName("pill")[0].style.width).replace("vh","")
        console.log(Obj_modify.getElementsByClassName("pill")[0].style)
        Valor_tela = `<div class='modify_canva'>
        
        <div>
            <label for="tamanho">Poder Mecanica</label>
            <input type='range' id='tamanho' min='20' max='200' value=${InitialValue}>
        </div>

        <div>
         <label for="cor">Cor da Mecanica</label>
        <input type = 'color' id='color_picker_qs' value=${"#"+Obj_modify.getElementsByClassName("pill")[0].style.backgroundColor}>    
        </div>
       
        <div>
         <label for="cor">texto Lembrete</label>
        <input type = 'text' id='text_sqs' value=${"#"+Obj_modify.getElementsByClassName("pill")[0].innerText}>    
        </div>
        
        <label>
    </div>`
    }
    else
    {
        Valor_tela = "Seelcione um objeto Primerio"
    }
    let ModifySetups = Oct_8.CreateContainerElement("screenModify","document","div","div")
    Oct_8.ModifyPropsDefault(ModifySetups,null,null,null,null)
    Oct_8.ModifyContentContainer(ModifySetups,`
        ${Valor_tela}
        `)
    if(Obj_modify != null)
    {
        document.getElementById("tamanho").addEventListener('change',()=>{
            Obj_modify.getElementsByClassName("pill")[0].style.width = document.getElementById("tamanho").value+"vh"
        })

        document.getElementById("color_picker_qs").addEventListener('change',()=>{
            Obj_modify.getElementsByClassName("pill")[0].style.backgroundColor = document.getElementById("color_picker_qs").value
        })

        document.getElementById("text_sqs").addEventListener('change',()=>{
            Obj_modify.getElementsByClassName("pill")[0].innerText = document.getElementById("text_sqs").value
        })


    }
},"screenModify")

Oct_8.CreateObjectFactory(()=>{
     document.getElementsByTagName("nav")[0].style.display = "none"
    let Card = Oct_8.CreateContainerElement("card","document","div","div")
    let Calculo = CalculoBaseCarta()
    let Efeitos = `Este card tem efeitos ${Calculo.agro_qtd} de agro, ${Calculo.tempo_qtd} de tempo, ${Calculo.control_qtd} de controle e ${Calculo.combo_qtd} de combo`
    let avisos = " "
    Oct_8.ModifyContentContainer(Card,`
    <div class="card">
        <h1>Card</h1>
        <h2>${avisos}</h2>
        <button class="close" id="closeCard">X</button>
        <div class="card-content">
            <label>Nome da Carta</label>
            <input type="text" id="cardName" placeholder="Nome da Carta" />
            <textarea id="cardDescription" > ${Efeitos} </textarea>
            <br><label>Combate</label>
            <br><input type="number" id="cardCombate" value="${Math.round(Calculo.agro/10)}" />
            <br><label>Área de Controle</label>
            <br><input type="number" id="cardArea" value="${Math.round(Calculo.control/10)}" />
            <br><label>Procura</label>
            <br><input type="number" id="cardProcura" value="${Math.round(Calculo.combo/10)}" />
            <br><label>Compra</label>
            <br><input type="number" id="cardProcura" value="${Math.round(Calculo.tempo/10)}" />
        </div>
    `)
    document.getElementById("closeCard").addEventListener("click", (e) => {
        document.getElementById("card").remove();  
        document.getElementsByTagName("nav")[0].style.display = "flex"
    })
    Oct_8.ModifyPropsDefault(Card,null,null,null,null)

},"card")

function RenderCard(){
    Oct_8.AppendObjectFacyotyTo("card","")
}

function RenderTela(){
    Oct_8.AppendObjectFacyotyTo("setup","")
}

function createTimeline() {
  const draggables = document.querySelectorAll(' .note');

  draggables.forEach(draggable => {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const startDrag = (e) => {
      isDragging = true;
      const rect = draggable.getBoundingClientRect();
      if(Remove_flag  == true)
      {
        draggable.remove()
      }

      if(Modificar == true)
      {
         Obj_modify = draggable
         document.getElementById("screenModify").remove()
         Oct_8.AppendObjectFacyotyTo("screenModify",null)
      }
      else
      {
        Modificar = false
      }
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
      draggable.style.cursor = 'grabbing';
    };

    const moveDrag = (e) => {
      if (!isDragging) return;

      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      const container = document.getElementById("document");
      const containerRect = container.getBoundingClientRect();

      let x = clientX - containerRect.left - offsetX;
      let y = clientY - containerRect.top - offsetY;

      // Limites
      x = Math.max(0, Math.min(x, container.offsetWidth - draggable.offsetWidth));
      y = Math.max(0, Math.min(y, container.offsetHeight - draggable.offsetHeight));

      draggable.style.left = `${x}px`;
      draggable.style.top = `${y}px`;
      draggable.style.position = 'absolute';
    };

    const endDrag = () => {
      isDragging = false;
      draggable.style.cursor = 'grab';
    };

    draggable.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', endDrag);
    

    draggable.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', moveDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
  });
}


createTimeline();

function CalculoBaseCarta(){
    let agro = 0;
    let agro_qtd = 0;
    let tempo = 0;
    let tempo_qtd = 0;
    let control = 0;
    let control_qtd = 0;
    let combo = 0;
    let combo_qtd = 0;
    let Energia =0

    document.querySelectorAll(".agro").forEach((e)=>{
        let constRect = e.getBoundingClientRect();
        agro += CalculateBase.Agro.Combate+constRect.width
        agro+= Math.round(CalculateBase.Agro.Combate+ constRect.left-constRect.top)
        tempo-= agro
        agro_qtd+=1
    })

    document.querySelectorAll(".tempo").forEach((e)=>{
        let constRect = e.getBoundingClientRect();
         tempo += CalculateBase.Tempo.Compra+constRect.width
         tempo+= Math.round(CalculateBase.Tempo.Compra+ constRect.left-constRect.top)
         control -= tempo
         tempo_qtd+=1
    })

    document.querySelectorAll(".control").forEach((e)=>{
        let constRect = e.getBoundingClientRect();
        control += CalculateBase.Control.Area+constRect.width
        control+= Math.round(CalculateBase.Control.Area+ constRect.left-constRect.top)
        agro -= control
        control_qtd+=1
    })

    document.querySelectorAll(".combo").forEach((e)=>{
        let constRect = e.getBoundingClientRect();
        combo += CalculateBase.Combo.Procura+constRect.width
        combo+= Math.round(CalculateBase.Combo.Procura+ constRect.left-constRect.top)
        control -= combo
        combo_qtd+=1

    })

    document.querySelectorAll(".energia").forEach((e)=>{
         let constRect = e.getBoundingClientRect();
        Energia+= Math.round(CalculateBase.Combo.Procura+constRect.width+ constRect.left-constRect.top)
        agro= agro-Energia;
        tempo=tempo-Energia
        control=control-Energia;
        combo=combo-Energia
    })
     agro = Math.round(agro /  GameConfiguration.CombateBase-GameConfiguration.PontosIniciais)
     tempo = Math.round(tempo /  GameConfiguration.Compra - GameConfiguration.Turnos)
     control = Math.round(control /  GameConfiguration.Area - GameConfiguration.Jogadores)
     combo = Math.round(combo /  GameConfiguration.Procura - GameConfiguration.CartasDeck)

    return {agro,tempo,control,combo,agro_qtd,tempo_qtd,control_qtd,combo_qtd}   
}