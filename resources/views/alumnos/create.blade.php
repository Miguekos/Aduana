@extends('layouts.app')

@section('title', 'Alumnos')
@section('pagina', 'Alumnos')

@section('content')

<style media="screen">
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #b9c2cc;
  border-bottom: 1px solid #c8ced3;
}
.card-footer {
    padding: 0.75rem 1.25rem;
    background-color: #b9c2cc;
    border-top: 1px solid #c8ced3;
}
</style>
<div class="col-lg-12">

        <form action="{{ route('alumno.store') }}" method="POST">
            {{ csrf_field() }}
            @foreach( $$titles as $title )

                {{ tipos_cursos }}


            @endforeach
            <div class="container-fluid">
              <div class="animated fadeIn">
                <div class="row">
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header">
                        <strong>Tipo de Curso</strong>
                        Datos
                      </div>
                      <div class="card-body">
                          <div class="form-group row">
                            <label class="col-md-3 col-form-label">Tipo de Curso</label>
                            <div class="col-md-9 col-form-label">
                              <select class="form-control" name="tipo_de_curso">
                                <option value="1">Auxiliar de Despacho Aduanero (curso)</option>
                                <option value="2">Sectorista Aduanero (curso)</option>
                                <option value="3">Liquidador Aduanero (curso)</option>
                                <option value="4">Gestor Aduanero(carrera)</option>
                                <option value="5">Diplomado de Com. Intern. y Aduana</option>
                                <option value="6">Otros</option>
                              </select>
                            </div>
                          </div>
                          <!-- <div class="form-group">
                            <input type="text" class="form-control" name="tipo_de_curso" placeholder="Tipo de Curso (Otros)">
                          </div> -->
                      </div>
                      <div class="card-footer">
                      </div>
                    </div>

                  </div>
                  <div class="col-md-6">

                    <div class="card">
                      <div class="card-header">
                        <strong>Modalidad</strong>
                        Datos
                      </div>
                      <div class="card-body">
                          <div class="form-group row">
                            <label class="col-md-3 col-form-label">Modalidad</label>
                            <div class="col-md-9 col-form-label">
                              <select class="form-control" name="modalidad">
                                <option value="presencial">Precencial</option>
                                <option value="virtual">Virtual</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group">
                            <input type="date" class="form-control" id="fecha_de_inicio" name="fecha_de_inicio" placeholder="Fecha de Inicio">
                          </div>
                      </div>
                      <div class="card-footer">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header">
                        <strong>Horarios</strong>
                        Datos
                      </div>
                      <div class="card-body">
                          <div class="form-group row">
                            <label class="col-md-3 col-form-label">Horarios</label>
                            <div class="col-md-9 col-form-label">
                              <select class="form-control" name="horarios">
                                <option value="mañana">Mañana</option>
                                <option value="tarde">Tarde</option>
                                <option value="noche">Noche</option>
                                <option value="">Definir Horas (Otros)</option>
                              </select>
                            </div>
                          </div>
                          <!-- <div class="form-group">
                            <input type="text" class="form-control" name="horarios" placeholder="Definir Horas (Otros)">
                          </div> -->
                      </div>
                      <div class="card-footer">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header">
                        <strong>Frecuencia</strong>
                        Datos
                      </div>
                      <div class="card-body">
                          <div class="form-group row">
                            <label class="col-md-3 col-form-label">Frecuencia</label>
                            <div class="col-md-9 col-form-label">
                              <select class="form-control" name="frecuencia">
                                <option value="l_v">Intensivo (L - V)</option>
                                <option value="l_m_v">Interdiario (L - M - V)</option>
                                <option value="sabados">Sabados</option>
                                <option value="">Otros (Especificar)</option>
                              </select>
                            </div>
                          </div>
                          <!-- <div class="form-group">
                            <input type="text" class="form-control" name="frecuencia" placeholder="Otros (Especificar)">
                          </div> -->
                      </div>
                      <div class="card-footer">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <div class="card-header">
                <strong>Personales</strong>
                <small>Datos</small>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                    <div class="form-group col-sm-4">
                        <label for="name">Apellidos</label>
                        <input class="form-control" id="apellidos" required name="apellidos" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Nombres</label>
                        <input class="form-control" id="nombre" required name="nombre" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Direccion</label>
                        <input class="form-control" id="direccion" name="direccion" placeholder="" type="text">
                    </div>
                    </div>

                    <div class="row">
                    <div class="form-group col-sm-6">
                        <label for="name">Departamento/Provincia/Distrito</label>
                        <input class="form-control" id="departamento" name="departamento" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="dni">Edad</label>
                        <input class="form-control" id="edad" name="edad" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="dni">DNI / C.E</label>
                        <input class="form-control" id="dni" required name="dni" placeholder="" type="text">
                    </div>
                    </div>

                    <div class="row">
                    <div class="form-group col-sm-6">
                        <label for="name">Lugar de Nacimiento</label>
                        <input class="form-control" id="lugar_de_nacimiento" name="lugar_de_nacimiento" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="dni">Telf. Fijo</label>
                        <input class="form-control" id="telf_fijo" name="telf_fijo" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="dni">Celular</label>
                        <input class="form-control" id="celular_p" name="celular_p" placeholder="" type="text">
                    </div>
                    </div>

                    <div class="row">
                    <div class="form-group col-sm-4">
                        <label for="name">Email</label>
                        <input class="form-control" id="email" required name="email" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Facebook</label>
                        <input class="form-control" id="facebook" name="facebook" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Padre o Apoderado</label>
                        <input class="form-control" id="padre_apoderado" name="padre_apoderado" placeholder="" type="text">
                    </div>
                    </div>

                    <div class="row">
                    <div class="form-group col-sm-4">
                        <label for="name">DNI (Apoderado)</label>
                        <input class="form-control" id="dni_apo" name="dni_apo" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Telf. Fijo (Apoderado)</label>
                        <input class="form-control" id="telf_fijo_apo" name="telf_fijo_apo" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Celular (Apoderado)</label>
                        <input class="form-control" id="celular_apo" name="celular_apo" placeholder="" type="text">
                    </div>
                    </div>

                    <div class="row">
                    <div class="form-group col-sm-4">
                        <label for="name">Direccion para envio de material virtual</label>
                        <input class="form-control" id="email_envio_material" name="email_envio_material" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Persona de contacto (Emergencias)</label>
                        <input class="form-control" id="persona_de_contacto" name="persona_de_contacto" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Lugar de Estudios (Actual)</label>
                        <input class="form-control" id="lugar_de_estudio" name="lugar_de_estudio" placeholder="" type="text">
                    </div>
                    </div>

                    <div class="row">
                    <div class="form-group col-sm-4">
                        <label for="name">Carrera de Estudio/Titulo</label>
                        <input class="form-control" id="carrera_estudio" name="carrera_estudio" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Centro Laboral</label>
                        <input class="form-control" id="centro_laboral" name="centro_laboral" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="dni">Direccion Centro Laboral</label>
                        <input class="form-control" id="direccion_laboral" name="direccion_laboral" placeholder="" type="text">
                    </div>
                    </div>

                <div class="card-header">
                    <strong>Forma de Pago</strong>
                    <small>Datos</small>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label for="dni">Forma de pago</label>
                                <input class="form-control" id="formas_de_pago" required name="formas_de_pago" placeholder="" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                    </div>
                </div>

                <div class="card-header">
                    <strong>Otros</strong>
                    <small>Datos</small>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label for="dni">Medio por el cual se entero de Nosotros</label>
                                <input class="form-control" id="publicidad" name="publicidad" placeholder="" type="text">
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="dni">Sugerencias</label>
                                <input class="form-control" id="" name="" placeholder="" type="text">
                            </div>
                        </div>

                    </div>
                    <div class="card-footer">

                    </div>
                </div>

                <div class="card-header">
                    <strong>Factura</strong>
                    <small>Datos</small>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <label for="name">Nombre Completo / Razon Social</label>
                                <input class="form-control" id="razon_social_fac" required name="razon_social_fac" placeholder="" type="text">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="dni">DNI / RUC / C.E</label>
                                <input class="form-control" id="dni_fac" required name="dni_fac" placeholder="" type="text">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="dni">Telefono</label>
                                <input class="form-control" id="telf_fac" required name="telf_fac" placeholder="" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label for="dni">Direccion Completa</label>
                                <input class="form-control" id="direccion_fac" required name="direccion_fac" placeholder="" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                      <input type="text" id="atentido" readonly class="form-control col-sm-3" name="atentido" placeholder="Atentido" value="">
                    </div>
                </div>

                <div class="card-footer">
                    <button type="submit" class="btn btn-sm btn-primary">
                        <i class="fa fa-dot-circle-o"></i> Guardar</button>
                    <button type="reset" class="btn btn-sm btn-danger">
                        <i class="fa fa-ban"></i> Reiniciar</button>
                </div>

            </div>
        </form>
</div>
</div>

@endsection('content')
