package core.sorting;

import core.models.CoreTypes.Model;

class Filter<M: Model> {

    private function new() {}

    public function filter(data: M): Bool { return false;}
}
