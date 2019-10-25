# Sequlize model generator with "Plop"

See "ployfile.js" for simple breakdown of inputs, actions for the sequalize model generation.

Read more about plop here: https://plopjs.com/


### Model YML format

A sequalize model has to be minimally defined in some format. The easiest human readable and writable format is YML. Below a sample model that contains all practical sequalize features we use on our models for bare minimum model file:

```yml
name: Test Model
fields:
  id:
	type: int
	primaryKey: true
	autoIncrement: true
  name: string
  status: enum(pending, active, disabled)
  created_at: timestamp
```

Few additional markers in simple "type" annotation to be extended with:

- "#" character designates primaryKey (also adds required: true, allowNull: false, autoIncrement: true options) (i.e: ```id: int#```)
- "+" character designates allowNull: false (i.e: ```name: string+```)


### Set up configuration file in your project:

Add following json configuration to your project root with .nomad-generators-config file:

```json
{
    "sequalize": {
        "models_path": "models"
    }
}
```

If your sequalize models stored in a different folder, define in this configuration variable.


### Install (as clonned code)

- ```npm install```
- ```npm run generate-model <yml-file-path>```


### Install (as package in parent/project)

Add the dependency and script to your package.json

devDependencies (or dependencies):
```"nomad-generator-sequalize": "git+ssh://git@ship.nomadinteractive.co:nomad-interactive/generator-sequalize.git"```

scripts:
```"generate-model": "nomad-generator-sequalize"```

Then, run
```npm install```
to install packages and register executable scripts


### Usage

To create a new model with yml schema:
```npm run generate-model```

You can also send the yml parameter in this command as argument like:

```npm run generate-model new-model.yml```

