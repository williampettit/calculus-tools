import sympy as sp
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/integrate', methods=['POST'])
def api_integrate():
  try:
    integrand = request.json['integrand']
    variable_of_integration = request.json['variable_of_integration']

    # compute integral
    unevaluated_integral = sp.Integral(sp.sympify(integrand), sp.Symbol(variable_of_integration))
    evaluated_integral = unevaluated_integral.doit()

    # generate latex
    latex_unevaluated = sp.latex(unevaluated_integral)
    latex_evaluated = sp.latex(evaluated_integral)
    latex_combined = latex_unevaluated + ' = ' + latex_evaluated

    return jsonify(
      {
        # 'result': str(result),
        'latex': latex_combined,
      },
    )

  except Exception as e:
    return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
  app.run(port=4444)
