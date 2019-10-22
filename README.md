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


### Install Run

- ```npm install```
- ```npm run generate-model <yml-file-path>```
