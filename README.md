# GENDIFF

### Difference generator

The CLI utility compares two configuration files. Supports files in json, yaml, yml formats. Works with flat files and nested structures.
The comparison result can be output in different formats: stylish (default), plain, json.

#### Hexlet tests and linter status:

[![Actions Status](https://github.com/zzpillau/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/zzpillau/frontend-project-46/actions) [![Project CI](https://github.com/zzpillau/frontend-project-46/actions/workflows/project-ci.yml/badge.svg)](https://github.com/zzpillau/frontend-project-46/actions/workflows/project-ci.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/4838a7d8db3a8ae9dae3/maintainability)](https://codeclimate.com/github/zzpillau/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4838a7d8db3a8ae9dae3/test_coverage)](https://codeclimate.com/github/zzpillau/frontend-project-46/test_coverage)

## System requirements

node.js v21.1.0 or higher

## Installation

```shell
git clone https://github.com/zzpillau/frontend-project-46.git
cd frontend-project-46
make install
```

## How to use CLI utility GENDIFF

● Output - stylish

```shell
gendiff file1.json file2.json
gendiff -f stylish file1.json file2.json
gendiff --format stylish file1.json file2.json
```

● Output - plain

```shell
gendiff -f plain file1.yaml file2.yml
```

● Output - json

```shell
gendiff -f json file1.yml file2.json
```

## DEMO

### Comparing flat files (JSON)

[![asciicast](https://asciinema.org/a/648888.svg)](https://asciinema.org/a/648888)

### Comparing flat files (yaml, yml)

[![asciicast](https://asciinema.org/a/649882.svg)](https://asciinema.org/a/649882)

### Comparing Nested Structures (output - stylish)

[![asciicast](https://asciinema.org/a/655437.svg)](https://asciinema.org/a/655437)

### Comparing Nested Structures (output - plain)

[![asciicast](https://asciinema.org/a/655990.svg)](https://asciinema.org/a/655990)

### Comparing Nested Structures (output - json)

[![asciicast](https://asciinema.org/a/656400.svg)](https://asciinema.org/a/656400)
