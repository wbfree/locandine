import { _Component, _ComponentAPI } from "./_component";

class _API {
    public GetIllustartori(): Object {

        if (!_Component.HasStorage("illustratori")) {
            new _ComponentAPI(
                new Object(),
                "https://balinona.synology.me/locandine_backend/api.php?table=_illustratori",
                "illustratori"
            );
        }

        return _Component.GetStorage<Object>("illustratori").Get();

    }

};

export default _API