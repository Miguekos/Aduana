@extends('layouts.app')

@section('title', 'Nuevo Alumno')

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
                                  <option value="7">Sectorista y Liquidador</option>
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
                                <strong>Frecuencia</strong>
                                Datos
                            </div>
                            <div class="card-body">
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label">Frecuencia</label>
                                    <div class="col-md-9 col-form-label">
                                        <select class="form-control" name="frecuencia">
                                            <option value="1">Intensivo (L - V)</option>
                                            <option value="2">Interdiario (L - M - V)</option>
                                            <option value="3">Sabados</option>
                                            <option value="4">Interdiario (M - J - S)</option>
                                            <option value="5">Otros (Especificar)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                  <input type="text" id="frecuencia_otros" class="form-control" name="frecuencia_otros" placeholder="Otros (Especificar)">
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
                              <select class="form-control" name="horario">
                                <option value="1">Mañana</option>
                                <option value="2">Tarde</option>
                                <option value="3">Noche</option>
                                <option value="4">Definir Horas (Otros)</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group">
                            <input type="text" class="form-control" name="definir_horas" placeholder="Definir Horas (Otros)">
                          </div>
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
                                            <option value="1">Presencial</option>
                                            <option value="2">Virtual</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label">Fecha de Inicio</label>
                                    <div class="col-md-9 col-form-label">
                                        <input type="date" class="form-control" id="fecha_de_inicio" name="fecha_de_inicio" placeholder="Definir Horas">
                                    </div>
                                </div>
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
                    <div class="form-group col-sm-3">
                        <label for="name">Lugar de Nacimiento</label>
                        <input class="form-control" id="lugar_de_nacimiento" name="lugar_de_nacimiento" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="name">Fecha de Nacimiento</label>
                        <input type="date" class="form-control" id="fecha_de_nacimiento" name="fecha_de_nacimiento" placeholder="" type="text">
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
                    <div class="form-group col-sm-3">
                        <label for="name">Direccion para envio de material virtual</label>
                        <input class="form-control" id="email_envio_material" name="email_envio_material" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="dni">Persona de contacto (Emergencias)</label>
                        <input class="form-control" id="persona_de_contacto" name="persona_de_contacto" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="dni">Lugar de Estudios (Actual)</label>
                        <input class="form-control" id="lugar_de_estudio" name="lugar_de_estudio" placeholder="" type="text">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="dni">Celular de contacto (Emergencias)</label>
                        <input class="form-control" id="celular_de_contacto" name="celular_de_contacto" placeholder="" type="text">
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
                            <div class="form-group col-sm-3">
                                <label for="formas_de_pago">Forma de pago</label>
                                <select class="form-control" name="formas_de_pago" id="formas_de_pago">
                                    <option value="1">Pagar en scotibank, con DNI en las cuentas de Escuela de Aduana</option>
                                </select>
                            </div>
                            <div class="col-sm-2">
                                <label for="totalidad_fp">Totalidad</label>
                                <input class="form-control" id="totalidad_fp" name="totalidad_fp" placeholder="Totalidad" type="text">
                            </div>
                            <div class="col-sm-2">
                                <label for="por_cuotas_m_fp">Por Cuotas</label>
                                <input class="form-control" id="por_cuotas_m_fp" name="por_cuotas_m_fp" placeholder="Por Cuotas Mensuales" type="text">
                            </div>
                            <div class="col-sm-2">
                                <label for="matricula">Matricula</label>
                                <input class="form-control" id="matricula" name="matricula" placeholder="Matricula" type="text">
                            </div>
                            <div class="col-sm-2">
                                <label for="matricula">Fehca</label>
                                <input type="date" class="form-control" id="fecha_de_pago_cronocrama" name="fecha_de_pago_cronocrama" placeholder="" type="text">
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
                                <select class="form-control" name="publicidad" id="publicidad">
                                    <option value="1">En el local</option>
                                    <option value="2">Via E-mail</option>
                                    <option value="3">Facebook</option>
                                    <option value="4">Amigos</option>
                                    <option value="5">Twitter</option>
                                    <option value="">Otros</option>
                                </select>
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="dni">Otros medios</label>
                                <input class="form-control" id="publicidad_otros" name="publicidad_otros" placeholder="" type="text">
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
                      <input type="text" id="atentido" readonly class="form-control col-sm-3" name="atentido" placeholder="Atentido" value="{{ Auth::user()->name }}">
                       </div>
                </div>

                <div class="card-footer">
                    <button type="submit" class="btn btn-sm btn-primary">
                        <i class="fa fa-dot-circle-o"></i> Guardar</button>
                    <button type="reset" class="btn btn-sm btn-danger">
                        <i class="fa fa-ban"></i> Reiniciar</button>
                </div>

            </div>
           </div>
          </div>
        </form>

</div>
@endsection('content')
