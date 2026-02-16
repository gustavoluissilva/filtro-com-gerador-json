package com.gustavo.contevertetxt.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class ConverterService {
    public List<Map<String,Object>> convertTxtToJson(
            MultipartFile file,
            String columnsStr,
            String separator,
            boolean skipHeader
    ) throws Exception{
        List<Map<String, Object>> resultList = new ArrayList<>();
        String[] colNames = Arrays.stream(columnsStr.split(","))
                .map(String::trim)
                .toArray(String[]::new);

        // Usamos try-with-resources para garantir que o arquivo seja fechado
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            String line;
            boolean isFirstLine = true;

            // Lê o arquivo sob demanda (excelente para 35k+ linhas)
            while ((line = br.readLine()) != null) {
                if (isFirstLine && skipHeader) {
                    isFirstLine = false;
                    continue;
                }
                isFirstLine = false;

                if (line.trim().isEmpty()) continue;

                // Transforma a linha num array usando o separador (ex: \t)
                String[] values = line.split(separator);

                // Usamos LinkedHashMap para manter a ordem das colunas inseridas
                Map<String, Object> row = new LinkedHashMap<>();

                for (int i = 0; i < colNames.length; i++) {
                    String val = (i < values.length) ? values[i].trim() : null;

                    // Mapeamento inteligente para booleanos (como no seu jason.txt)
                    Object finalValue = val;
                    if ("VERDADEIRO".equalsIgnoreCase(val)) {
                        finalValue = true;
                    } else if ("FALSO".equalsIgnoreCase(val)) {
                        finalValue = false;
                    }

                    row.put(colNames[i], finalValue);
                }
                resultList.add(row);
            }
        }

        return resultList;

    }
}
