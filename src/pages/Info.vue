<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel w-100  documentation">
        <div class="content-wrapper">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 doc-header">
                <h1 class="text-primary mt-4">¿Cómo funciona esto?</h1>
              </div>
            </div>
            <div class="row doc-content">
              <div class="col-12 col-md-10 offset-md-1">
                <div class="col-12 grid-margin" id="doc-intro">
                  <div class="card">
                    <div class="card-body">
                      <h3 class="mb-4 mt-4">Introducción.</h3>
                      <p>Partes de trabajo en la nube - es una aplicación para una mejor gestión de partes de trabajo. Sus funciones son la disponibilidad de los partes en tiempo real, creación de nuevos partes y consulta de anteriores.</p>
                    </div>
                  </div>
                </div>
                <div class="col-12 grid-margin" id="doc-started">
                  <div class="card">
                    <div class="card-body">
                      <pre class="shell-mode"><h3 class="mb-4">El detalle del administrador.</h3></pre>
                      <p>El punto de la entrada en la aplicación es registrarse <router-link to="/register">aquí</router-link> con el nombre de la empresa, correo electrónico y contraseña.
                        <br>
                        Una vez registrado, usted adapte el papel de administrador y con ello tiene siguientes funciones:   </p>
                      <div class="alert alert-success mt-4 d-flex align-items-center" role="alert">
                        <ul>
                          <li>Crear y eliminar obras y proyectos</li>
                          <li>Crear y eliminar encargados</li>
                          <li>Crear y eliminar diferentes partes para cada obra(proyecto)</li>
                        </ul>
                      </div>
                      <hr class="mt-5">
                      <pre class="shell-mode"><h3 class="mb-4">El detalle del encargado.</h3></pre>
                      <p>El encargado tiene el punto de entrada en la aplicación <router-link to="/">aquí</router-link>, con el papel de encargado y email y contraseña indicados por el administrador. </p>
                      <p>Las funciones  son crear y eliminar obras y proyectos, trabajadores y partes.</p>
                      <p>El encargado solo puede eliminar los proyectos, trabajadores y partes que el mismo ha creado.</p>
                      <hr class="mt-5">
                      <pre class="shell-mode"><h3 class="mb-4">El detalle del trabajador.</h3></pre>
                      <p>El trabajador tiene el punto de entrada en la aplicación <router-link to="/">aquí</router-link>, con el papel de trabajador y email y contraseña indicados por el administrador o el encargado.</p>
                      <p>El trabajador únicamente puede crear nuevos partes o eliminar partes que ha creado anteriormente.</p>

                      <div class="alert alert-warning mt-4" role="alert">
                        Dudas, preguntas o tu opinión sobre mejoras necesarias <a href="https://api.whatsapp.com/send?phone=+34664622522&text=Hola, una pregunta sobre" target="_blank">allí</a>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

