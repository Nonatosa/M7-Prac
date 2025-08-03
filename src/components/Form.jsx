import { useForm } from 'react-hook-form'

export function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = data => console.log(data)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header minimalista */}
      <header className="bg-slate-800 p-4 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-100">Portal de Contacto</h1>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
            {/* Encabezado del formulario */}
            <div className="bg-slate-800 p-6">
              <h2 className="text-2xl font-semibold text-slate-100 text-center">Formulario de Contacto</h2>
            </div>
            
            {/* Cuerpo del formulario */}
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Campo Nombre */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                  <input
                    {...register('name', { required: 'Este campo es obligatorio' })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition"
                    placeholder="Ej: Juan Pérez"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-rose-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Campo Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email es requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition"
                    placeholder="Ej: ejemplo@correo.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Campo Mensaje */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                  <textarea
                    rows="4"
                    {...register('message', { 
                      required: 'Por favor escribe un mensaje',
                      minLength: {
                        value: 20,
                        message: 'El mensaje debe tener al menos 20 caracteres'
                      }
                    })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-rose-600">{errors.message.message}</p>
                  )}
                </div>

                {/* Botón de envío */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-slate-700 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors shadow-sm"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>

            {/* Pie del formulario */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                Todos los derechos reservados © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="bg-slate-800 p-3 text-center text-slate-300 text-xs">
        <p>Información legal y enlaces adicionales</p>
      </footer>
    </div>
  )
}