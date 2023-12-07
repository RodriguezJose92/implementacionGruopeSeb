/* Petición SeverMudi GruopeSeb*/
async function serverData ({
    token = undefined,
    sku = undefined
  }) {
  
    // Errores
    if (token == null) { console.error('Error Mudi: Token Api Null') ;  return }
    if ( sku == null)  { console.error('Error Mudi: SKU Null') ;  return}
  
    // Respuesta positiva 
    let contentBody = { "skus": [`${sku}`] }
  
    const req = await fetch ('https://mudiview.mudi.com.co:7443/product/getProductsUrl' , {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'tokenapi':token
      },
      body: JSON.stringify(contentBody)
    })
  
    const jsonResponse = await req.json();
    const finalResponse = jsonResponse.data[0];
  
    return finalResponse;
  
  };
  
  /** Creamos Los estilos */
  function createStyles({idCompany}){
    const link = document.createElement('LINK');
    link.setAttribute('rel','stylesheet');
    link.id="stylesMudiGeneral";
    link.href=`https://mudi.com.co/module/mudi/index-${idCompany}.css`; /* Pueden tomarlos de esta ruta */
   
    document.head.appendChild(link)
  };
  
  /** Crear botones ( btn3D y btnAR ) */
  function createBtns({father,sku,idCompany,link3D,color,zBtns,zModal,ButtonsY}){
  
    const fatherContainer = father;
    // fatherContainer.setAttribute('style','position:relative')
  
    // Creación del contenedor principal para los botones
    const containerPrincipalBtns = document.createElement('DIV');
    containerPrincipalBtns.classList.add('ContainerBtnsMudi');
    containerPrincipalBtns.id="containerBtnsMudi";
    containerPrincipalBtns.setAttribute('style',`z-index:${zBtns}; ${ButtonsY}:0`)
    
    containerPrincipalBtns.innerHTML=`
    <div class="tooltip showTooltipInit">
      <p><b>¡Nuevo!</b> prueba nuestras experiencias de 3D y Realidad Aumentada</p>
    </div>
    <img src="https://mudi.com.co/cliente/${idCompany}/btn3D.webp" alt="Boton Mudi para activar 3D" class="btnMudi3D" id="btnMudi3D" sku=${sku} title="Haz click para tener una experiencia 3D">
    <img src="https://mudi.com.co/cliente/${idCompany}/btnAR.webp" alt="Boton Mudi para activar AR" class="btnMudiAR" id="btnMudiAR" sku=${sku} title="Haz click para tener una experiencia de realidad aumentada">`;
    
    containerPrincipalBtns.querySelector('.btnMudi3D').addEventListener('click',()=>{ createModal3D({link3D:link3D,color:color,zModal:zModal}) },false);
    containerPrincipalBtns.querySelector('.btnMudiAR').addEventListener('click',()=>{ createModalAR({color:color, idCompany:idCompany, sku:sku,zModal:zModal}) },false);
    fatherContainer.appendChild(containerPrincipalBtns);
  
    setTimeout(()=>{
      const tool = document.querySelector('.showTooltipInit');
      tool.classList.remove('showTooltipInit')
      tool.classList.add('hideTooltip')
    },10000)
  
  };
  
  /** Creamos el modal 3D */
  function createModal3D({link3D,color,zModal}){
  
    const div = document.createElement('DIV')
    div.classList.add('modalMudi')
    div.id="modalMudi";
    div.setAttribute('style',`z-index:${zModal}`);
    div.innerHTML=`
    <div class="contentModal3D">
      <h1 class="closeModal" style="color:${color}; text-align:center">X</h1>
      <iframe class="iframeMudi3D" src="${link3D}"></iframe>
      <a href="https://mudi.com.co" target="_blank">
        <img class="powerByMudi3D" src="https://mudi.com.co/Assets/SVG/powerByMudi.webp" type="image/webp" alt="Power By Mudi">
      </a>
    </div>`;
  
    div.querySelector('.closeModal').addEventListener('click',()=>{
      document.body.querySelector('.modalMudi').remove();
    })
  
    document.body.appendChild(div);
  };
  
  /** Creamos el Modal AR */
  function createModalAR({color,idCompany,sku,zModal}){
    const div = document.createElement('DIV')
    div.classList.add('modalMudi')
    div.id="modalMudi";
    div.setAttribute('style',`z-index:${zModal}`);
    div.innerHTML=`
      <div class="contentModalAR">
          <h1 class="closeModal" style="color:${color}; text-align:center;">X</h1>
          <h2 class="modalTitleMudi">Recomendaciones para ver el producto en Realidad Aumentada.</h2>
  
          <div class="principalContentModalAR">
  
              <div class="fristContentMudi">
  
                  <div class="containerMudiSteps">
                      <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step1.webp">
                      <div class="containerStepsText">
                          <h3 class="stepTitleMudi">Apunta tu teléfono al piso para ver el producto.</h3>
                          <p class="stepParagrahpMudi">Prueba otro espacio si no puedes ver el producto.</p>
                      </div>
                  </div>
  
                  <div class="containerMudiSteps">
                      <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step2.webp">
                      <div class="containerStepsText">
                          <h3 class="stepTitleMudi">Desplaza para visualizar.</h3>
                          <p class="stepParagrahpMudi">Mueve tu dedo en la pantalla para rotar la imagen.</p>
                      </div>
                  </div>
  
                  <div class="containerMudiSteps">
                      <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step3.webp">
                      <div class="containerStepsText">
                          <h3 class="stepTitleMudi">Amplia y detalla el producto.</h3>
                          <p class="stepParagrahpMudi">Controla el zoom arrastrando dos dedos en la pantalla de adentro hacia afuera.</p>
                      </div>
                  </div>
  
                  <div class="containerMudiSteps">
                      <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step4.webp">
                      <div class="containerStepsText">
                          <h3 class="stepTitleMudi">Toca dos veces para restablecer.</h3>
                          <p class="stepParagrahpMudi">Vuelve al tamaño original haciendo doble click sobre el producto.</p>
                      </div>
                  </div>
  
                  <button class="initARMudi" style="background-color:${color};">Iniciar AR</button>
  
              </div>
  
              <div class="secondContentMudi">
                  <h3 class="stepTitleMudi qrTitlePart"> Escanea el código QR para ver el producto en realidad aumentada.</h3>
                  <div class="containerQRMudi">
                    <img src="https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=https%3A%2F%2Fviewer.mudi.com.co%2Fv1%2Far%2F%3Fid%3D${idCompany}%26sku%3D${sku}" class="codeQRMudi">
                  </div>
                  <a class="hrefMudiAR" href="https://mudi.com.co" target="_blank">
                    <img class="powerByMudiAR" src="https://mudi.com.co/Assets/SVG/powerByMudi.webp" type="image/webp" alt="Power By Mudi">
                  </a>
              </div>
  
          </div>
  
      </div>`;
  
      div.querySelector('.closeModal').addEventListener('click',()=>{
        document.body.querySelector('.modalMudi').remove();
      });
  
      div.querySelector('.initARMudi').addEventListener('click',()=>{
        window.open(`https://viewer.mudi.com.co/v1/ar/?id=${idCompany}&sku=${sku}`)
      })
  
      document.body.appendChild(div);
  };
  
  /**Envío de data DataLayer */
  function sendDataLayer({sku,nameCompany}){

    let OSdevice;

    if(navigator.userAgent.includes('Android')) OSdevice='Android';
    else if ( navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) OSdevice="IOS";
    else OSdevice='DESK';

    window.dataLayer = window.dataLayer || []

    /** Evento de visualización */
    dataLayer.push({
        event:'Evento de visualización Mudi',
        valorMudi:1,
        sku:sku,
        categoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a').innerHTML,
        subCategoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a').innerHTML : 'null',
        seccion:document.querySelector('span.vtex-breadcrumb-1-x-term.ph2.c-on-base') ? document.querySelector('span.vtex-breadcrumb-1-x-term.ph2.c-on-base').innerHTML : 'null',
        sistemaOperativo:OSdevice,
        marca:nameCompany
    });

    /** Evento de intención de compra */
    document.querySelector('div > div:nth-child(10) > div > div > div:nth-child(2)').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de intención de compra Mudi',
            valorMudi:1,
            sku:sku,
            categoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a').innerHTML,
            subCategoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a').innerHTML : 'null',
            seccion:document.querySelector('span.vtex-breadcrumb-1-x-term.ph2.c-on-base') ? document.querySelector('span.vtex-breadcrumb-1-x-term.ph2.c-on-base').innerHTML : 'null',
            sistemaOperativo:OSdevice,
            marca:nameCompany
        })
    },false);

    /** Evento de interación AR Mudi */
    document.getElementById('btnMudiAR').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de interacción AR Mudi',
            valorMudi:1,
            sku:sku,
            categoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a').innerHTML,
            subCategoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a').innerHTML : 'null',
            seccion:document.querySelector('span.vtex-breadcrumb-1-x-term.ph2.c-on-base') ? document.querySelector('span.vtex-breadcrumb-1-x-term.ph2.c-on-base').innerHTML : 'null',
            sistemaOperativo:OSdevice,
            marca:nameCompany
        })
    },false);

    /** Evento de interación 3D Mudi */
    document.getElementById('btnMudi3D').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de interacción 3D Mudi',
            valorMudi:1,
            sku:sku,
            categoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--2.ph2.c-muted-2 > a').innerHTML,
            subCategoria:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a') ? document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--3.ph2.c-muted-2 > a').innerHTML : 'null',
            seccion:document.querySelector('span.vtex-breadcrumb-1-x-term.ph2.c-on-base') ? document.querySelector('span.vtex-breadcrumb-1-x-term.ph2.c-on-base').innerHTML : 'null',
            sistemaOperativo:OSdevice,
            marca:nameCompany
        })
    },false);

  };
  
  // Función Main Mudi --
  async function MudiExperience ({
    client,
    skuNumber,
    containerBtns,
  
    zIndexBtns=1,
    zIndexModal=1,
  
    positionBtnsY='bottom',
  }) {

    const info = {
        IMUSA: {
            name: "imusa",
            company: "190",
            token: "693cXRcbvCaktw4SEPvo",
            colorCompany:"#e9d228"
        },
        SAMURAI: {
            name: "samurai",
            company: "192",
            token: "dqq7UhqueifQoxhDJhdY",
            colorCompany:"#e9d228"
        },
        TEFAL: {
            name: "tefal",
            company: "382",
            token: "8SERggbqCM7ZXtUkbAaF",
            colorCompany:"#63747a"
        },
        KRUPS: {
            name: "krups",
            company: "381",
            token: "yZibFBji9kpJhdRs9UdS",
            colorCompany:"#2889e9"
        }
    };
    
    const server = await serverData( {token:info[client].token, sku:skuNumber} );
    if(!server){ console.warn(`El producto identificado con el SKU: "%c${skuNumber}%c" en Mudi 3D&AR Commerce, no tiene 3D ni AR`, 'color: red; font-weight: bold', 'color: black;'); return };

    const parameterBtns={ father:containerBtns, sku:skuNumber, idCompany:info[client].company, link3D:server.URL_WEB ,color:info[client].colorCompany, zBtns:zIndexBtns,zModal:zIndexModal, ButtonsY:positionBtnsY}
  
    /** Una vez tengamos la respuesta positiva creamos los estilos generales y los botones */
    createStyles({idCompany:info[client].company});
    createBtns(parameterBtns);
    sendDataLayer({sku:skuNumber,nameCompany:info[client].name});
  };

MudiExperience({
    client:document.querySelector('span.vtex-breadcrumb-1-x-arrow.vtex-breadcrumb-1-x-arrow--1.ph2.c-muted-2 > a').innerHTML,
    skuNumber: document.querySelector('.vtex-product-identifier-0-x-product-identifier__value').innerHTML,
    containerBtns:document.querySelector('body > div.render-container.render-route-store-product > div > div.vtex-store__template.bg-base > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(7) > section > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div.swiper-container.swiper-container-initialized.swiper-container-horizontal.vtex-store-components-3-x-productImagesGallerySwiperContainer > div.swiper-wrapper > div.swiper-slide.vtex-store-components-3-x-productImagesGallerySlide.center-all.swiper-slide-active > div'),
    zIndexModal:1000,
});
