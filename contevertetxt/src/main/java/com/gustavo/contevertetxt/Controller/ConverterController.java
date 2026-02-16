package com.gustavo.contevertetxt.Controller;
import com.gustavo.contevertetxt.Service.ConverterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/converter")
@CrossOrigin(origins = "*") // Permite que qualquer frontend consuma sua API

public class ConverterController {
    private final ConverterService converterService;

    // Injeção de dependência via construtor (Boa prática!)
    public ConverterController(ConverterService converterService) {
        this.converterService = converterService;
    }

    @PostMapping("/txt-to-json")
    public ResponseEntity<Map<String, Object>> convertFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("columns") String columns,
            @RequestParam(value = "separator", defaultValue = "\t") String separator,
            @RequestParam(value = "skipHeader", defaultValue = "false") boolean skipHeader) {

        Map<String, Object> response = new HashMap<>();

        if (file.isEmpty()) {
            response.put("error", "O arquivo não pode estar vazio.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            List<Map<String, Object>> data = converterService.convertTxtToJson(file, columns, separator, skipHeader);

            response.put("success", true);
            response.put("total_records", data.size());
            response.put("data", data);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erro ao processar o arquivo: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
