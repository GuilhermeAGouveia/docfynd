package com.search.docfynd.nlu;

import com.elasticsearch.search.api.model.Keyword;
import com.ibm.cloud.sdk.core.security.IamAuthenticator;
import com.ibm.watson.natural_language_understanding.v1.NaturalLanguageUnderstanding;
import com.ibm.watson.natural_language_understanding.v1.model.AnalysisResults;
import com.ibm.watson.natural_language_understanding.v1.model.AnalyzeOptions;
import com.ibm.watson.natural_language_understanding.v1.model.ConceptsOptions;
import com.ibm.watson.natural_language_understanding.v1.model.Features;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class WatsonNLU {
    private NaturalLanguageUnderstanding naturalLanguageUnderstanding;

    public WatsonNLU() {
        createConnection();
    }

    private void createConnection() {
        IamAuthenticator authenticator = new IamAuthenticator("1hIEMLga1OvjEUX8dNjEWYfjKWHbevV3s7vDQsXoFQbP");
        naturalLanguageUnderstanding = new NaturalLanguageUnderstanding("2022-04-07", authenticator);
        naturalLanguageUnderstanding.setServiceUrl("https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/9b895e6e-b3fb-4e8c-8871-faf09b502ff2");
    }

    public List<Keyword> extractConcepts(String text) {

        ConceptsOptions concepts= new ConceptsOptions.Builder()
                .limit(3)
                .build();

        Features features = new Features.Builder()
                .concepts(concepts)
                .build();

        AnalyzeOptions parameters = new AnalyzeOptions.Builder()
                .text(text)
                .features(features)
                .build();

        AnalysisResults response = naturalLanguageUnderstanding
                .analyze(parameters)
                .execute()
                .getResult();
        return response.getConcepts().stream().map(c -> {
            var keyword = new Keyword();
            keyword.text(c.getText());
            keyword.dbpediaResource(c.getDbpediaResource());
            return keyword;
        }).collect(Collectors.toList());
    }   


}
