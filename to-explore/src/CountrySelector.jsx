import React, { useState, useMemo, useRef, useEffect } from "react";
import Select from "react-select";
// import countryList from "react-select-country-list";
import comuniWithSpec from "./comuni.json";
import regioniWithSpec from "./regioni.json";
import provinceWithSpec from "./province.json";

function CountrySelector({ passaState }) {
  const [regione, setRegione] = useState("");
  const [provincia, setProvincia] = useState("");
  const [comune, setComune] = useState("");
  const [loading, setLoading] = useState(false);
  const regioniRef = useRef();
  const provincieRef = useRef();
  const comuniRef = useRef();
  // const stati = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    if (regione && provincia && comune) {
      passaState({
        regione: regione.label,
        provincia: provincia.label,
        comune: provincia.label,
      });
    }
  }, [regione, provincia, comune, passaState]);

  const regioniItaliane = useMemo(
    () =>
      regioniWithSpec.map((el) => ({
        value: el.id,
        label: el.nome,
      })),
    []
  );

  const provincieItaliane = useMemo(
    () =>
      provinceWithSpec.map((el) => ({
        value: el.id_regione,
        label: el.nome,
      })),
    []
  );
  const provincieFiltrate = provincieItaliane.filter(
    (el) => el.value === regione.value
  );

  const comuniItaliani = useMemo(
    () =>
      comuniWithSpec.map((el) => ({
        value: el.provincia.nome,
        label: el.nome,
      })),
    []
  );

  const comuniFiltrati = comuniItaliani.filter(
    (el) => el.value === provincia.label
  );

  const changeRegione = (regione) => {
    setRegione(regione);
  };

  const changeProvincia = (provincia) => {
    setProvincia(provincia);
    setComune(provincia);
  };

  const changeComune = (comune) => {
    setComune(comune);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <Select
        placeholder="Scrivi o seleziona la regione"
        ref={regioniRef}
        className="w-full"
        options={regioniItaliane}
        value={regione}
        onChange={changeRegione}
      />
      {regione && (
        <div>
          <Select
            placeholder="scrivi o seleziona la provincia"
            ref={provincieRef}
            className="w-full"
            options={provincieFiltrate}
            value={provincia}
            onChange={changeProvincia}
            isDisabled={!regione ? true : false}
          />
        </div>
      )}
      {provincia && (
        <div>
          <Select
            placeholder="scrivi o seleziona il comune"
            ref={comuniRef}
            className="w-full"
            options={comuniFiltrati}
            // value={comune}
            onChange={changeComune}
            isDisabled={!provincia ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default CountrySelector;
