const path = require('path')
const fs = require('fs')
const YAML = require('yaml')
const helpers = require('handlebars-helpers')()

const templateFilePath = 'model-template.hbs'

const getYmlField = (ymlFile, fieldName) => {
	const yamlFileStr = fs.readFileSync(path.resolve(ymlFile), 'utf8')
	const parsedYml = YAML.parse(yamlFileStr)
	return parsedYml[fieldName]
}

const getName = (ymlFile) => {
	return getYmlField(ymlFile, 'name')
}

const getFields = (ymlFile) => {
	const fields = getYmlField(ymlFile, 'fields')
	const fieldsKeys = Object.keys(fields)
	for (let i = 0; i < fieldsKeys.length; i += 1) {
		let val = fields[fieldsKeys[i]]
		// Plain inline data types to object + type field format
		if (typeof val !== 'object') {
			let newFieldScheme = {}
			if (val.indexOf('+') !== -1) {
				newFieldScheme.allowNull = false
				val = val.replace(/\+/g, '')
			}
			if (val.indexOf('#') !== -1) { // pkey
				newFieldScheme.primaryKey = true
				newFieldScheme.allowNull = false
				newFieldScheme.autoIncrement = true
				val = val.replace(/\#/g, '')
			}
			newFieldScheme.type = val
			fields[fieldsKeys[i]] = newFieldScheme
		}
		// Convert inline enum data type to type and values fields
		if (fields[fieldsKeys[i]].type.substr(0, 4) === 'enum'
			&& fields[fieldsKeys[i]].type.indexOf('(') !== -1) {
				const typeVal = fields[fieldsKeys[i]].type
				fields[fieldsKeys[i]].type = 'enum'
				fields[fieldsKeys[i]].values = typeVal
					.split('(')[1].split(')')[0]
					.split(',')
					.map(v => v.trim())
		}
	}
	return fields
}

const getSequalizeType = (type) => {
	switch (type.toLowerCase()) {
		case 'integer':
		case 'int':
		case 'number':
		case 'num':
			return 'DataTypes.INTEGER'
			break
		case 'timestamp': 
		case 'datetime': 
			return 'DataTypes.DATE'
			break
		case 'bool': 
		case 'boolean': 
			return 'DataTypes.BOOLEAN'
			break
		case 'enum': 
			return 'DataTypes.ENUM'
			break
		case 'date': 
		case 'dateonly': 
		case 'date-only': 
			return 'DataTypes.DATEONLY'
			break
		case 'text':
			return 'DataTypes.TEXT'
		case 'string':
		case 'varchar':
		default:
			return 'DataTypes.STRING'
	}
}

module.exports = (plop) => {
	console.log('pwd', path.pwd)
	
	// Extended Handlebar Helpers
	plop.addHelper('eq', helpers.eq)
	plop.addHelper('not', helpers.not)
	plop.addHelper('isFalsey', helpers.isFalsey)
	plop.addHelper('typeOf', helpers.typeOf)
	plop.addHelper('join', helpers.join)

	// Custom Helpers
	plop.addHelper('getName', getName)
	plop.addHelper('getFields', getFields)
	plop.addHelper('getSequalizeType', getSequalizeType)

	const previewAction = (answers) => {
		const tpl = fs.readFileSync(path.resolve(templateFilePath), 'utf8')
		const renderedTempalte = plop.renderString(tpl, answers)
		console.log('====> RenderedTempalte\n\n', renderedTempalte)
	}
	
    plop.setGenerator('model', {
		description: 'Create sequalize model',
        prompts: [
			{
				type: 'input',
				name: 'yml',
				message: 'Enter the model yml file path',
				validate: function (value) {
					if (fs.existsSync(path.resolve(value))) { return true }
					return 'Yml path is not valid';
				}
			}
		],
        actions: [
			previewAction,
			// {
			// 	type: 'add',
			// 	path: './models/{{ snakeCase (getName yml) }}.js',
			// 	templateFile: templateFilePath,
			// 	force: true,
			// }
		]
    })
}
