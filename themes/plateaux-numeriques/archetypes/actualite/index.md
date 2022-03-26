---
title: "{{ replace .Name "-" " " | title }}"
slug: "{{ now.Format "2006-01-02" }}-{{ .Name }}"
date: {{ .Date }}
publishDate: {{ .Date }}
draft: true
description:
categories:
tags:
resources:
- name: header
  src: img/
---