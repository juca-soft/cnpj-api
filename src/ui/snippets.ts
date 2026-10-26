export const snippetLangs = [
  { id: 'curl', label: 'cURL' },
  { id: 'js', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'php', label: 'PHP' },
  { id: 'go', label: 'Go' },
  { id: 'csharp', label: 'C#' },
  { id: 'powershell', label: 'PowerShell' },
] as const

export function snippet(lang: string, url: string): string {
  switch (lang) {
    case 'curl':
      return `curl "${url}"`
    case 'js':
      return `const res = await fetch("${url}");
if (!res.ok) throw new Error((await res.json()).error);

const empresa = await res.json();
console.log(empresa.razao_social);`
    case 'python':
      return `import requests

res = requests.get("${url}", timeout=15)
res.raise_for_status()
print(res.json()["razao_social"])`
    case 'php':
      return `<?php
$empresa = json_decode(file_get_contents("${url}"), true);
echo $empresa["razao_social"];`
    case 'go':
      return `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	res, err := http.Get("${url}")
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	var empresa map[string]any
	json.NewDecoder(res.Body).Decode(&empresa)
	fmt.Println(empresa["razao_social"])
}`
    case 'csharp':
      return `using var http = new HttpClient();
var json = await http.GetStringAsync("${url}");
Console.WriteLine(json);`
    case 'powershell':
      return `$empresa = Invoke-RestMethod "${url}"
$empresa.razao_social`
    default:
      return ''
  }
}
